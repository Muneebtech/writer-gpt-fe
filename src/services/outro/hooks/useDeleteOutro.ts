import { useMutation, useQueryClient } from "react-query";
import { OutroServices } from "../OutroServices";

export function UseDeleteOutro() {
  const queryClient = useQueryClient();
  const { data, isLoading, isSuccess, mutate,isError } = useMutation(
    "",
    (id: string) => OutroServices.deleteOutro(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("useOutro"); // Assuming the query key for the list is "channelList"
      },
    }
  );

  return { data, isLoading, isSuccess, mutate,isError };
}
