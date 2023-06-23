import { useMutation } from "react-query";
import { ChannelServices } from "../channelServices";

export function useCreateChannel() {
    const { isLoading, data, isSuccess, mutate } = useMutation("createChannel", (data: any) =>
        ChannelServices.postChannelData(data)
    )
    return { data, isLoading, isSuccess, mutate }
}