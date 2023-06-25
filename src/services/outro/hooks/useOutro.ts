import { useQuery } from "react-query";
import { UseOutroData } from "../OutroServices";

export function useGetOutro() {
  const { isLoading, data, isSuccess } = useQuery(
    "useOutro",
    () => UseOutroData.getOutroData()
  );
  const results = data?.results;
  return { data: results, isLoading, isSuccess };
}
