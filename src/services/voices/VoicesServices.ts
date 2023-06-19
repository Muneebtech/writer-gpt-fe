import { request } from "@/lib/axios";
export class VoiceServices {
    static getVoices() {
        return request({
            url: "/voices",
            method: "GET"
        })
    }
}