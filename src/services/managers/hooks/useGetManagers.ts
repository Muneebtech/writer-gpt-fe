import { useQuery } from "react-query";
import { getManagersServices } from "../getManagersServices";

export function UseGetManagers() {
  const { data, isLoading, isSuccess } = useQuery(
    "getManagers",
    () => getManagersServices.getManagers(),
    {
      cacheTime: 30000,
      staleTime: 30000,
    }
  );
  return { data, isLoading, isSuccess };
}
