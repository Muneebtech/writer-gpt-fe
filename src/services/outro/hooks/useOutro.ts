import { useQuery } from "react-query";
import { UseOutroData } from "../OutroSevices";

export function useOutro() {
  const { isLoading, data, isSuccess } = useQuery(
    "useOutro",
    () => UseOutroData.getOutroData(),
    {
      cacheTime: 300000,
      staleTime: 300000,
    }
  );
  const results = data?.results;
  return { data: results, isLoading, isSuccess };
}
