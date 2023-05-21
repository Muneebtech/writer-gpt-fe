import { useMutation } from "react-query";
import { AuthService } from "../authService";

export function useLogout(callback?: Function) {
  const { mutate, isLoading } = useMutation(AuthService.logoutUser, {
    onSuccess: (_response) => {
      callback?.();
    },
  });

  return { mutate, isLoading };
}
