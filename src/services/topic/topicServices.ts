import { Topic } from "@/constants/Topic";
import { request } from "@/lib/axios";
export class TopicServices {
    static getTopicData() {
        return request({
            url: "/topic",
            method: "GET"
        })
    }
    static getPostTopic(data: Topic) {
        return request({
            url: "/topic",
            method: "POST",
            data: data
        })
    }
    static getDeleteTopic(id: string) {
        return request({
            url: `/topic/${id}`,
            method: "DELETE",
      
        })
    }
}