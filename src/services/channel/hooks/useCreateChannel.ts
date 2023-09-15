import { useMutation, useQueryClient } from "react-query";
import { ChannelServices } from "../channelServices";
export function useCreateChannel() {

  const { isLoading, data, isSuccess, mutate } = useMutation(
    "createChannel",
    (data: FormData) => ChannelServices.postChannelData(data)
  );
  return { data, isLoading, isSuccess, mutate };
}
