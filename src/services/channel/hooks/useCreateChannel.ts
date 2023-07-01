import { useMutation } from "react-query";
import { ChannelServices } from "../channelServices";
import { createChannelTypes } from "@/components/Types/channel.types"
export function useCreateChannel() {
    const { isLoading, data, isSuccess, mutate } = useMutation("createChannel", (data: FormData) =>
        ChannelServices.postChannelData(data)
    )
    return { data, isLoading, isSuccess, mutate }
}