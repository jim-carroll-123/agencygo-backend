export interface User {
  _id?: string;
  isAdmin: boolean;
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
  isAgency: boolean;
  password: string;
}
