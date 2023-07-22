import { outroDataTypes } from "@/components/Types/Outro.type";
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
    static addOutroData(data: outroDataTypes) {
        console.log(data, "data");

        const params = {
            description: data.description,
            outro: data.outro,
        };

        return request({
            url: "/outro",
            method: "POST",
            data: params
        });
    }
    static deleteOutro(id: string) {
        return request({
            url: `/outro/${id}`,
            method: "DELETE"
        })
    }
}