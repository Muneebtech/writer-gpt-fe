import { useQuery } from "react-query";
import { UseOutroData } from "../OutroSevices";


export function useOutro() {
    const { isLoading, data, isSuccess } = useQuery("useOutro", () =>
        UseOutroData.getOutroData()
    )
    return { data, isLoading, isSuccess }
}