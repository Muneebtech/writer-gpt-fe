import { useMutation } from "react-query";
import { UseOutroData } from "../OutroServices";
import { outroDataTypes } from "@/components/Types/Outro.type";

export function useAddOutro() {
  const { isLoading, data, isSuccess, mutate } = useMutation((data: outroDataTypes) =>
    UseOutroData.addOutroData(data)
  );

  return { isLoading, data, isSuccess,  mutate };
}