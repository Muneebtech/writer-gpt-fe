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
    console.log(data, "data");

    const params = {
      description: data.description,
      outro: data.outro,
    };

    return request({
      url: "/outro",
      method: "POST",
      data: params,
    });
  }
  static deleteOutro(id: string) {
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
