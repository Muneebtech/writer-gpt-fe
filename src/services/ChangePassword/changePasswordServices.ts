import { request } from "@/lib/axios";
import { ChangePasswordTypes } from "@/utils/types";


export class ChangePassword {
    static changeuserPassword(password: ChangePasswordTypes) {
        return request({
            url: "auth/change-password",
            method: "POST",
            data: password
        })
    }
}