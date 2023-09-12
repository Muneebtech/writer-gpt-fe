import { request } from "@/lib/axios";
import { ProfileuserName } from "@/utils/types";

export class ProfileServices {
    static getProfileData(data: ProfileuserName) {
        console.log(data, "getProfileData");

        return request({
            url: `/users/${data.id}`,
            method: "PATCH",
            data: data.name
        });
    }
}