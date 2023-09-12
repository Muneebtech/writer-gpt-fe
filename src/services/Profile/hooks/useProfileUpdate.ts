import { useMutation } from "react-query";
import { ProfileServices } from "../profileServices";
import { ProfileuserName } from "@/utils/types";

export const useProfileUpdate = () => {
    const { mutate, isLoading, isSuccess } = useMutation((data: ProfileuserName) =>
        ProfileServices.getProfileData(data) // Assuming you have an updateProfile function
    );
    return { mutate, isLoading, isSuccess };
}
   