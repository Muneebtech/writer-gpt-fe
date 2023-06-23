import { request } from "@/lib/axios";
export class TopicServices {
    static getTopicData() {
        return request({
            url: "/topic",
            method: "GET"
        })
    }
}