import { useQuery } from "react-query";
import { VoiceServices } from "../VoicesServices";

export function useVoices() {
  const { isLoading, data, isSuccess } = useQuery(
    "voices",
    () => VoiceServices.getVoices(),
    {
      cacheTime: 300000, // 5minutes is set for cache
      staleTime: 300000,
    }
  );
  return { data, isLoading, isSuccess };
}
