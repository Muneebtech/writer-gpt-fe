import { useQuery } from "react-query";
import { ChannelServices } from "../channelServices";
import { QueryData } from "@/components/Types/queryData.type";



export function useGetChannels(dataa:QueryData) {
  const { isLoading, data, isSuccess } = useQuery(
    ["useGetChannels", dataa],
    () => ChannelServices.getChannels(dataa),
    {
      cacheTime: 300000,
      staleTime: 300000,
    }
  );
  const results = data?.results;
  return { data: results, isLoading, isSuccess };
}
