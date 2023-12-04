import { hash, compare } from 'bcrypt';
import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { User } from '@interfaces/users.interface';
import { UserModel } from '@models/users.model';

@Service()
export class UserService {
  public async findAllUser(): Promise<User[]> {
    const users: User[] = await UserModel.find();
    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    const findUser: User = await UserModel.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: User): Promise<User> {
    const findUser: User = await UserModel.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    if (!userData.isEmployee || !userData.firstName) {
      throw new HttpException(400, 'Missing required fields: isEmployee and firstName');
    }

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await UserModel.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async updateUser(userId: string, userData): Promise<User> {
    if (userData.email) {
      const findUser: User = await UserModel.findOne({ email: userData.email });
      if (findUser && findUser._id != userId) throw new HttpException(409, `This email ${userData.email} already exists`);
    }
    if (userData.oldPassword && userData.newPassword && userData.confirmNewPassword) {
      if (userData.newPassword !== userData.confirmNewPassword) {
        throw new HttpException(400, 'New passwords do not match');
      }
      const user: User = await UserModel.findById(userId);
      if (!user) {
        throw new HttpException(404, 'User not found');
      }

      const isMatch = await compare(userData.oldPassword, user.password);
      if (!isMatch) {
        throw new HttpException(400, 'Old password is incorrect');
      }

      const hashedPassword = await hash(userData.newPassword, 10);
      userData = { ...userData, password: hashedPassword };
      delete userData.oldPassword;
      delete userData.newPassword;
      delete userData.confirmNewPassword;
    } else if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }

    const updateUserById: User = await UserModel.findByIdAndUpdate(userId, userData, { new: true });
    if (!updateUserById) throw new HttpException(409, "User doesn't exist");

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await UserModel.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "User doesn't exist");

    return deleteUserById;
  }
}
