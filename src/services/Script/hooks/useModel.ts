import { useQuery } from "react-query";
import { GetLanguageModelData } from "../scriptServices";

export function useModel() {
  const { isLoading, data, isSuccess } = useQuery(
    "model",
    () => GetLanguageModelData.getModelData(),
    {
      cacheTime: 300000,
      staleTime: 300000,
    }
  );
  const results = data?.results;

  return { isLoading, data: results, isSuccess };
}
