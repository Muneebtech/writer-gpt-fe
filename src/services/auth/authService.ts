import { request } from "./../../lib/axios";
import { Logout, SignIn } from "./types";

export class AuthService {
  static logInUser(data: SignIn) {
    return request({
      url: "/auth/login",
      method: "POST",
      data: data,
    });
  }
  static logoutUser(data: Logout) {
    return request({
      url: "/auth/logout",
      method: "POST",
      data: data,
    });
  }
}
