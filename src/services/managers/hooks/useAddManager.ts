import { useMutation } from "react-query";
import { getManagersServices } from "../getManagersServices";
import { AddManagerType, ManagerType } from "@/components/Types/manager.type";

export function UseAddManagers() {
  const { data, isLoading, isSuccess, mutate } = useMutation(
    "getManagers",
    (data: AddManagerType) => getManagersServices.addManager(data)
  );
  return { data, isLoading, isSuccess, mutate };
}
