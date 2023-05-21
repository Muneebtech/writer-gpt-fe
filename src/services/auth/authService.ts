import { request } from "./../../lib/axios";
import { SignIn } from "./types";

export class AuthService {
  static logInUser(data: SignIn) {
    return request({
      url: "/auth/login",
      method: "POST",
      data: data,
    });
  }
  static logoutUser() {
    return request({
      url: "/auth/logout",
      method: "POST",
    });
  }
}
