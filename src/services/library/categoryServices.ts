import { request } from "@/lib/axios";
export class CategoryServices {
    static categoryData() {
        return request({
            url: "/categoryData",
            method: "GET"
        })
    }
}