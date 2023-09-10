import { useMutation, useQueryClient } from "react-query";
import { ChannelServices } from "../channelServices";


export function useDeletechannels() {
    const queryClient = useQueryClient();

    const { data, mutate, isSuccess, isLoading } = useMutation("DeleteChannels", (id: string) =>
        ChannelServices.getDeleteChannels(id as any)

    )
    {
        queryClient.invalidateQueries("useGetChannels"); // Assuming the query key for the list is "useGetChannels"

    }
    return { data, mutate, isSuccess, isLoading }
}