import { getChannelTypes } from "@/components/Types/channel.types";
import { QueryData } from "@/components/Types/queryData.type";
import { request } from "@/lib/axios";

export class ChannelServices {
  static postChannelData(data: FormData) {
    return request({
      url: "/channels",
      method: "POST",
      data: data,
    });
  }
  static getChannels(data: QueryData) {
    return request({
      url: "/channels",
      method: "GET",
      params: data,
    });
  }

  static getBrandsChanneldata(id: string) {
    return request({
      url: `/job`,
      method: "GET",
      params: { channel: id },
    });
  }
  static getDeleteChannels(id: string) {
    return request({
      url: `/channels/${id}`,
      method: "DELETE",
    });
  }
  static updateChannel(data: any) {
    return request({
      url: `/channels/${data.id}`,
      method: "PATCH",
      data: data.newData,
    });
  }
}
