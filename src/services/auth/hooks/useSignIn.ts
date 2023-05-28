import { useMutation } from "react-query";
import { SignIn } from "../types";
import { AuthService } from "../authService";

export function useSignIn() {
  const { mutate, isLoading, data, isSuccess } = useMutation(
    (data: SignIn) => AuthService.logInUser(data),
    {
      onSuccess: (_response) => {},
    }
  );
  return { data, mutate, isLoading, isSuccess };
}
