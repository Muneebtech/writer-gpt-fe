import { useMutation, useQueryClient } from "react-query";
import { OutroServices } from "../OutroServices";
import { outroDataTypes } from "@/components/Types/Outro.type";

export function useAddOutro() {
  const invalidateClient = useQueryClient();
  const { isLoading, data, isSuccess, mutate } = useMutation(
    (data: outroDataTypes) => OutroServices.addOutroData(data),
    {
      onSuccess() {
        invalidateClient.invalidateQueries("useOutro");
      },
    }
  );
  return { isLoading, data, isSuccess, mutate };
}
