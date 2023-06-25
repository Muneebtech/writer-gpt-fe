import { useQuery } from "react-query";
import { UseOutroData } from "../OutroServices";


export function postOutro() {
    const { isLoading, data, isSuccess } = useQuery("useOutro", () =>
        UseOutroData.postOutroData()
    )
    return { data, isLoading, isSuccess }
}