import { useQuery } from "react-query";
import { GetScriptData } from "../scriptServices";


export function useScript() {
    const { isLoading, data, isSuccess } = useQuery("useScript", () =>
        GetScriptData.getScript()
    )
    return { isLoading, data, isSuccess }
}