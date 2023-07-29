import { useMutation, useQueryClient } from "react-query";
import { updateOutro } from "../type";
import { OutroServices } from "../OutroServices";

export function useUpdateOutro() {
  const invalidateClient = useQueryClient();
  const { isLoading, data, isSuccess, mutate } = useMutation(
    "useUpdateOutro",
    (data: updateOutro) => OutroServices.updateTopic(data),
    {
      onSuccess() {
        invalidateClient.invalidateQueries("useOutro");
      },
    }
  );
  const results = data?.results;

  return { data: results, isLoading, isSuccess, mutate };
}
