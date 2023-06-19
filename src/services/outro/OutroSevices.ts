import { request } from "@/lib/axios";
export class UseOutroData {
    static getOutroData() {
        return request({
            url: "/outro",
            method: "GET"
        })
    }
    static postOutroData() {
        return request({
            url: "/outro",
            method: "POST"
        })
    }
}