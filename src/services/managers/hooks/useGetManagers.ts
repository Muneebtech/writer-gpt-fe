import { useMutation } from "react-query";
import { getManagersServices } from "../getManagersServices";
import { getManager } from "../types";

export function UseGetManagers() {
  const { data, isLoading, isSuccess,mutate } = useMutation(
    "getManagers",
    (params: getManager) => getManagersServices.getManagers(params),
    // {
    //   cacheTime: 30000,
    //   staleTime: 30000,
    // }
  );
  return { data, isLoading, isSuccess,mutate };
}
