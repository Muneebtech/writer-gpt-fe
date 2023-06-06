import { useQuery } from "react-query";
import { ChannelServices } from "../channelServices";

export function useCreateChannel() {
    const { isLoading, data, isSuccess } = useQuery("createChannel", () =>
        ChannelServices.postChannelData()
    )
    return { data, isLoading, isSuccess }
}