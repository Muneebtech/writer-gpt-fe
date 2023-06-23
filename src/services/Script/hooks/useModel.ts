import { useQuery } from "react-query";
import { GetLanguageModelData } from "../scriptServices";

export function useModel() {
    const { isLoading, data, isSuccess } = useQuery("model", () =>
        GetLanguageModelData.getModelData
    )

    return { isLoading, data, isSuccess }
}