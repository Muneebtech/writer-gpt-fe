import { request } from "@/lib/axios";
export class JobServices {
    static getJobs() {
        return request({
            url: "/job",
            method: "GET"
        })
    }
}