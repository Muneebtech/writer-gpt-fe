import { useMutation } from "react-query";
import { ChangePassword } from "../../changePasswordServices";
import { ChangePasswordTypes } from "@/utils/types";

export function useChangePassword(password: ChangePasswordTypes) {
    const { data, isLoading, isSuccess, mutate } = useMutation("changePassword", () =>
        ChangePassword.changeuserPassword(password)
    )
    return { data, isLoading, isSuccess, mutate }
}