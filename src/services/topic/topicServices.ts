import { Topic } from "@/constants/Topic";
import { request } from "@/lib/axios";
import { getTopic, updateTopic } from "./types";
export class TopicServices {
  static getTopicData(params: getTopic) {
    return request({
      url: "/topic",
      method: "GET",
      params: params,
    });
  }
  static getPostTopic(data: Topic) {
    return request({
      url: "/topic",
      method: "POST",
      data: data,
    });
  }
  static getDeleteTopic(id: string) {
    return request({
      url: `/topic/${id}`,
      method: "DELETE",
    });
  }
  static updateTopic(data: updateTopic) {
    return request({
      url: `/topic/${data.id}`,
      method: "PATCH",
      data: { description: data.topic },
    });
  }
}
