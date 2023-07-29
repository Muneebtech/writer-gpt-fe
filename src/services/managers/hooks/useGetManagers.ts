import { useQuery } from "react-query";
import { getManagersServices } from "../getManagersServices";
import { getManager } from "../types";

export function UseGetManagers(params: getManager) {
  const { data, isLoading, isSuccess } = useQuery(
    "getManagers",
    () => getManagersServices.getManagers(params),
    {
      cacheTime: 30000,
      staleTime: 30000,
    }
  );
  return { data, isLoading, isSuccess };
}
