import { useQuery } from "react-query";
import { ChannelServices } from "../channelServices";

export function useGetBrandsJobs(id: string) {
  const { isLoading, data, isSuccess } = useQuery(["BrandsJobs", id], () =>
    ChannelServices.getBrandsChanneldata(id)
  );
  return { isLoading, data, isSuccess };
}
