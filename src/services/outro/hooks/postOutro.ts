import { useQuery, useQueryClient } from "react-query";
import { OutroServices } from "../OutroServices";

export function usePostOutro() {
  const invalidateClient = useQueryClient();
  const { isLoading, data, isSuccess } = useQuery(
    "usePostOutro",
    () => OutroServices.postOutroData(),
    {
      onSuccess() {
        invalidateClient.invalidateQueries("useOutro");
      },
    }
  );
  return { data, isLoading, isSuccess };
}
