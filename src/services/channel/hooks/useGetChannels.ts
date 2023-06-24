import { useQuery } from "react-query";
import { ChannelServices } from "../channelServices";

export function useGetChannels() {
  const { isLoading, data, isSuccess } = useQuery(
    "getChannels",
    (dataa: any) => ChannelServices.getChannels(dataa),
    {
      cacheTime: 300000,
      staleTime: 300000,
    }
  );
  const results = data?.results
  return { data :results, isLoading, isSuccess };
}
