import { useMutation } from "react-query";
import { ChangePassword } from "../../changePasswordServices";
import { ChangePasswordTypes } from "@/utils/types";

export function useChangePassword() {
    const { data, isLoading, isSuccess, mutate } = useMutation("changePassword", (password: ChangePasswordTypes) =>
        ChangePassword.changeuserPassword(password)
    )
    return { data, isLoading, isSuccess, mutate }
}