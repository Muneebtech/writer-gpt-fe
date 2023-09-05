import { useMutation } from "react-query";
import { JobServices } from "../JobsServices";

export function useRewriteJob() {
  const { isLoading, data, isSuccess, mutate } = useMutation(
    (data: any) => JobServices.rewriteJob(data)
  );
  return { data, isLoading, isSuccess, mutate };
}
