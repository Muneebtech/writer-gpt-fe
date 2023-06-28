import { useInfiniteQuery } from "react-query";
import { ChannelServices } from "../channelServices";
import { QueryData } from "@/components/Types/queryData.type";
export function useGetChannels(params: QueryData) {
  const {
    isLoading,
    data,
    isSuccess,
    fetchNextPage,
  } = useInfiniteQuery(
    ["useGetChannels", params],
    ({ pageParam = 1 }) => {
      console.log(params?.page, "Pageparam")
      return (
        ChannelServices.getChannels({
          ...params,
          page: pageParam,
          limit: params?.limit

        })
      )
    },
    {
      getNextPageParam: (lastPage) => lastPage.page + 1,
    }
  );

  const mergedData = data?.pages.flatMap((page) => page.results) || [];
  const totalCount = data?.pages[0]?.totalCount || 0;
  return { data: mergedData, isLoading, isSuccess, totalCount, fetchNextPage };
}
