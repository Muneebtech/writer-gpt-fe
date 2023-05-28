export interface SignIn {
  email: string;
  password: string;
  forced: boolean;
}
export interface Logout {
  refreshToken: string;
}
