import { useMutation } from "react-query";
import { ChannelServices } from "../channelServices";
export function useGetChannelById() {
  const { data, mutate, isSuccess, isLoading } = useMutation(
    "ChannelById",
    (id: string) => ChannelServices.getChannelById(id)
  );
  return { data, mutate, isSuccess, isLoading };
}
