import { useMutation } from "react-query";
import { ChannelServices } from "../channelServices";
import { ChaneelDataTypes } from "@/components/Types/channel.types"
export function useCreateChannel() {
    const { isLoading, data, isSuccess, mutate } = useMutation("createChannel", (data: ChaneelDataTypes) =>
        ChannelServices.postChannelData(data)
    )
    return { data, isLoading, isSuccess, mutate }
}