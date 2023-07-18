import { AddManagerType, ManagerType } from "@/components/Types/manager.type";
import { request } from "@/lib/axios";

export class getManagersServices {
  static getManagers() {
    return request({
      url: "/users",
      method: "GET",
    });
  }
  static addManager(data: AddManagerType) {
    return request({
      url: "/users/invite",
      method: "POST",
      data: data,
    });
  }
}
// ?role=Manage
