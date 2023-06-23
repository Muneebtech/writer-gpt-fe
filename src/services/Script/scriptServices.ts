import { request } from "@/lib/axios";

export class GetScriptData {
    static getScript() {
        return request({
            url: "",
            method: "",
        })
    }
}

export class GetLanguageModelData {
    static getModelData() {
        return request({
            url: "/model",
            method: "GET"
        })
    }
}

export class GetTopicData {
    static getTopicData() {
        return request({
            url: "/topic",
            method: "GET"
        })
    }
}