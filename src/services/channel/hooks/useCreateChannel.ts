import { useMutation, useQueryClient } from "react-query";
import { ChannelServices } from "../channelServices";
import useNotification from "@/hooks/useNotificaitons";
export function useCreateChannel() {
  const queryClient = useQueryClient();

  const { isLoading, data, isSuccess, mutate } = useMutation(
    "createChannel",
    (data: FormData) => ChannelServices.postChannelData(data),
    {
      onError: () => {
        useNotification({
          message: "An Error Occured!",
          duration: 3000,
          type: "error",
        });
      },
      onSuccess: () => {
        useNotification({
          message: "Successfully Created Channel!",
          duration: 3000,
          type: "success",
        });
        queryClient.invalidateQueries("useGetChannels"); // Assuming the query key for the list is "channelList"
      },
    }
  );
  return { data, isLoading, isSuccess, mutate };
}
