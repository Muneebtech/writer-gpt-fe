import { outroDataTypes } from "@/components/Types/Outro.type";
import { request } from "@/lib/axios";
import { getOutro, updateOutro } from "./type";
export class OutroServices {
  static getOutroData(params: getOutro) {
    return request({
      url: "/outro",
      method: "GET",
      params: params,
    });
  }
  static postOutroData() {
    return request({
      url: "/outro",
      method: "POST",
    });
  }
  static addOutroData(data: outroDataTypes) {
    console.log(data, "OutrpAddData");

    return request({
      url: "/outro",
      method: "POST",
      data: data,
    });
  }
  static deleteOutro(id: string) {
    console.log(id, "Outro Delete");

    return request({
      url: `/outro/${id}`,
      method: "DELETE",
    });
  }
  static updateTopic(data: updateOutro) {
    return request({
      url: `/outro/${data.id}`,
      method: "PATCH",
      data: { description: data.outro },
    });
  }
}
