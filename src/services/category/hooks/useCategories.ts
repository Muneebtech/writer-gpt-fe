import { useQuery } from "react-query";
import { GetCategoriesData } from "../categoryServices";

export function useCategories() {
    const { isLoading, data, isSuccess } = useQuery("category", () =>
        GetCategoriesData.getCategories()
    )
    return { isLoading, data, isSuccess }
}