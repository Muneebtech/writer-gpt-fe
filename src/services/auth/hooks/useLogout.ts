import { useMutation } from "react-query";
import { AuthService } from "../authService";
import { Logout } from "../types";

export function useLogout() {
  const { mutate, isLoading,isSuccess } = useMutation((data: Logout) =>
    AuthService.logoutUser(data)
  );

  return { mutate, isLoading,isSuccess };
}
