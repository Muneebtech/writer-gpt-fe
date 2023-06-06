import { request } from "@/lib/axios";
export class TopicServices {
    static getTopicData() {
        return request({
            url: "/outrodata",
            method: "GET"
        })
    }
}