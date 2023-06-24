import { useMutation } from "react-query";
import { JobServices } from "../JobsServices";
import { createJob } from "../types";

export function useCreateJob() {
  const { isLoading, data, isSuccess, mutate } = useMutation(
    (data: FormData) => JobServices.createJob(data)
  );
  return { data, isLoading, isSuccess, mutate };
}
