import { useMutation } from "react-query";
import { JobServices } from "../JobsServices";

export function useCommandJob() {
  const { isLoading, data, isSuccess, mutate } = useMutation(
    (data: FormData) => JobServices.newCommandJob(data)
  );
  return { data, isLoading, isSuccess, mutate };
}
