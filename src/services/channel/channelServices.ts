import { request } from "@/lib/axios";

export class ChannelServices{
    static postChannelData(){
        return request({
            url:"/channelservices",
            method:"POST"
        })
    }
}