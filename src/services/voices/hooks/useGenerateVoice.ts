import { useMutation } from "react-query";
import { VoiceServices } from "../VoicesServices";
import { generateVoice } from "@/components/Types/voice.types";

export function useGenerateVoice() {
  const { isLoading, data, isSuccess, mutate } = useMutation(
    "voices",
    (data: generateVoice) => VoiceServices.generateVoice(data)
  );
  return { data, isLoading, isSuccess, mutate };
}
