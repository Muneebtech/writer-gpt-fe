import { useMutation } from "react-query";
import { ChannelServices } from "../channelServices";


export function useDeletechannels() {
    const { data, mutate, isSuccess, isLoading } = useMutation("DeleteChannels", (id: string) =>
        ChannelServices.getDeleteChannels(id)
    )
    return { data, mutate, isSuccess, isLoading }
}