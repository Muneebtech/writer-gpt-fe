import { request } from "@/lib/axios";

export class ChannelServices {
    static postChannelData(data: any) {
        return request({
            url: "/channels",
            method: "POST",
            data: data
        })
    }
}