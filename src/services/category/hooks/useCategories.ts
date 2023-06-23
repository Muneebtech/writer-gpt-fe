import { useQuery } from "react-query";
import { GetCategoriesData } from "../categoryServices";

export function useCategories() {
  const { isLoading, data, isSuccess } = useQuery(
    "category",
    () => GetCategoriesData.getCategories(),
    {
      cacheTime: 300000,
      staleTime: 300000,
    }
  );
  return { isLoading, data, isSuccess };
}
