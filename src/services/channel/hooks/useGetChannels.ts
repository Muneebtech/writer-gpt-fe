import { useInfiniteQuery } from "react-query";
import { ChannelServices } from "../channelServices";
import { QueryData } from "@/components/Types/queryData.type";
export function useGetChannels(params: QueryData) {
  const {
    isLoading,
    data,
    isSuccess,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    refetch
  } = useInfiniteQuery(
    ["useGetChannels", params],
    ({ pageParam = 1 }) => {
      return ChannelServices.getChannels({
        ...params,
        page: pageParam,
        limit: params?.limit,
      });
    },
    {
      getNextPageParam: lastPage => lastPage.page + 1,
      cacheTime: 300000,
      staleTime: 300000,
    }
  );

  const mergedData = data?.pages.flatMap(page => page.results) || [];
  const totalCount = data?.pages[0]?.totalCount || 0;
  const currentPage = data?.pages[data.pages.length - 1]?.page || 0;
  const totalPages = data?.pages[data.pages.length - 1]?.totalPages || 0;
  return {
    data: mergedData,
    isLoading,
    isSuccess,
    totalCount,
    fetchNextPage,
    currentPage,
    totalPages,
    isFetchingNextPage,
    isFetching,
    refetch
  };
}
