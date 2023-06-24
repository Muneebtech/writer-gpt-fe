import { request } from "@/lib/axios";

export class GetCategoriesData {
    static getCategories() {
        return request({
            url: `/category`,
            method: "GET",
        })
    }
}