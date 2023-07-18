import { useQuery, useQueryClient } from "react-query";
import { UseOutroData } from "../OutroServices";

export function usePostOutro() {
  const invalidateClient = useQueryClient();
  const { isLoading, data, isSuccess } = useQuery(
    "usePostOutro",
    () => UseOutroData.postOutroData(),
    {
      onSuccess() {
        invalidateClient.invalidateQueries("useOutro");
      },
    }
  );
  return { data, isLoading, isSuccess };
}