import { useQuery } from "react-query";
import { getManagersServices } from "../getManagersServices";

export function UseGetManagers() {
    const { data, isLoading, isSuccess } = useQuery("getManagers", () =>
        getManagersServices.getManagers()
    )
    return { data, isLoading, isSuccess }
}