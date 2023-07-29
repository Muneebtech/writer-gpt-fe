import { useMutation, useQuery } from "react-query";
import { OutroServices } from "../OutroServices";
import { getOutro } from "../type";

export function useGetOutro() {
  const { isLoading, data, isSuccess, mutate } = useMutation(
    "useOutro",
    (params: getOutro) => OutroServices.getOutroData(params)
  );
  const results = data?.results;
  return { data: results, isLoading, isSuccess, mutate };
}
