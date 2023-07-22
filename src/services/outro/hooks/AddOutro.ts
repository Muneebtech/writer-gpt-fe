import { useMutation, useQueryClient } from "react-query";
import { UseOutroData } from "../OutroServices";
import { outroDataTypes } from "@/components/Types/Outro.type";

export function useAddOutro() {
  const invalidateClient = useQueryClient();
  const { isLoading, data, isSuccess, mutate } = useMutation((data: outroDataTypes) =>
    UseOutroData.addOutroData(data),
    {
      onSuccess() {
        invalidateClient.invalidateQueries("useOutro");
      },
    }

  )
  return { isLoading, data, isSuccess, mutate };
}