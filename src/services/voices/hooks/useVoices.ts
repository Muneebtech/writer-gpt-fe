import { useQuery } from "react-query";
import { VoiceServices } from "../VoicesServices";

export function useVoices() {
    const { isLoading, data, isSuccess } = useQuery("voices", () =>
        VoiceServices.getVoices()
    )
    return { data, isLoading, isSuccess }
}