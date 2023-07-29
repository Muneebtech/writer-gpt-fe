import { AddManagerType, ManagerType } from "@/components/Types/manager.type";
import { request } from "@/lib/axios";
import { getManager } from "./types";

export class getManagersServices {
  static getManagers(params: getManager) {
    return request({
      url: "users/managers",
      method: "GET",
      params: params,
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
