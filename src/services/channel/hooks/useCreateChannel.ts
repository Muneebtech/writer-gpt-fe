import { useMutation } from "react-query";
import { ChannelServices } from "../channelServices";
import { createChannelTypes } from "@/components/Types/channel.types";
import useNotification from "@/hooks/useNotificaitons";
export function useCreateChannel() {
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
      },
    }
  );
  return { data, isLoading, isSuccess, mutate };
}
