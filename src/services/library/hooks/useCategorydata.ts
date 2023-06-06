import { useQuery } from "react-query";
import { CategoryServices } from "../categoryServices";

export function useCategpryData() {
    const { isLoading, data, isSuccess } = useQuery("createChannel", () =>
        CategoryServices.categoryData()
    )
    return { data, isLoading, isSuccess }
}