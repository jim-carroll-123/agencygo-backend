import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/httpException';
import { DataStoredInToken, RequestSignUp, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { UserModel } from '@models/users.model';
import { AgencyModel } from '@/models/agency.model';
import { EmployeeModel } from '@/models/employee.model';
import { Agency } from '@/interfaces/agency.interface';
import { Employee } from '@/interfaces/employee.interface';

const createToken = (user: User): any => {
  const dataStoredInToken: DataStoredInToken = { _id: user._id };
  const expiresIn: number = 60 * 60;

  return { expiresIn, token: sign(dataStoredInToken, SECRET_KEY, { expiresIn }) };
};

const createCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};

@Service()
export class AuthService {
  public async signup(userData: RequestSignUp): Promise<{ user: User }> {
    const findUser: User = await UserModel.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);
    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await UserModel.create({
      firstName: userData.agencyName,
      email: userData.email,
      isAdmin: true,
      isAgency: true,
      isEmployee: false,
      password: hashedPassword,
    });
    const agencyData: Agency = await AgencyModel.create({
      agencyName: userData.agencyName,
      numberOfCreators: userData.numberOfCreators,
      userId: createUserData._id,
      websiteUrl: userData.agencyWebsite,
      socialMediaLink: userData.agencyMediaSocial,
    });
    const updateUserData: User = await UserModel.findByIdAndUpdate(createUserData._id, {
      $set: { agencyId: agencyData._id },
    });

    const tokenData = createToken(updateUserData);
    // const cookie = createCookie(tokenData);

    return { user: updateUserData };
  }

  public async login(userData: User): Promise<{ findUser: User }> {
    const findUser: User = await UserModel.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Invalid Credentials'); // should not let user know which field is wrong

    const tokenData = createToken(findUser);
    // const cookie = createCookie(tokenData);

    return { findUser, tokenData };
  }

  public async logout(userData: User): Promise<User> {
    const findUser: User = await UserModel.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    return findUser;
  }

  public async verify(userData: User) {
    try {
      const agency = await AgencyModel.findOne({ userId: userData._id });
      if (!agency) {
        throw new HttpException(404, `Agency not found`);
      }
      const response: {
        agency: Agency;
        employee?: Employee;
      } = {
        agency,
      };
      console.log(userData, agency);
      if (userData?.isEmployee) {
        const employee = await EmployeeModel.findOne({ userId: userData._id });
        if (!employee) {
          throw new HttpException(404, `Employee not found`);
        }
        response.employee = employee;
      }
      return response;
    } catch (error) {
      throw error;
    }
  }
}
