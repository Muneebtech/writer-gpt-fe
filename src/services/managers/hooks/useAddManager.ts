import { useMutation, useQueryClient } from "react-query";
import { getManagersServices } from "../getManagersServices";
import { AddManagerType, ManagerType } from "@/components/Types/manager.type";

export function UseAddManagers() {
  const invalidate = useQueryClient();
  const { data, isLoading, isSuccess, mutate } = useMutation(
    "getManagers",
    (data: AddManagerType) => getManagersServices.addManager(data),
    {
      onSuccess() {
        invalidate.invalidateQueries("getManagers");
      },
    }
  );
  return { data, isLoading, isSuccess, mutate };
}
