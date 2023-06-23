import { useQuery } from "react-query";
import { ChannelServices } from "../channelServices";

export function useGetChannels(dataa: any) {
  const { isLoading, data, isSuccess } = useQuery(
    "getChannels",
    () => ChannelServices.getChannels(dataa),
    {
      cacheTime: 300000,
      staleTime: 300000,
    }
  );
  return { data, isLoading, isSuccess };
}
