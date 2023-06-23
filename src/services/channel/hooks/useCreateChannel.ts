import { useQuery } from "react-query";
import { ChannelServices } from "../channelServices";

export function useCreateChannel(dataa: any) {
    const { isLoading, data, isSuccess } = useQuery("createChannel", () =>
        ChannelServices.postChannelData(dataa)
    )
    return { data, isLoading, isSuccess }
}