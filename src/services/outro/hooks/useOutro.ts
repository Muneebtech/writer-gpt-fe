import { useQuery } from "react-query";
import { UseOutroData } from "../OutroServices";

export function useGetOutro() {
  const { isLoading, data, isSuccess } = useQuery(
    "useOutro",
    () => UseOutroData.getOutroData(),
    {
      cacheTime: 30000,
      staleTime: 30000,
    }
  );
  const results = data?.results;
  return { data: results, isLoading, isSuccess };
}
