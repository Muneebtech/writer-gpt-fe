import { useMutation, useQueryClient } from "react-query";
import { ChannelServices } from "../channelServices";

export function useDeleteChannels() {
    const mutation = useMutation("DeleteChannels", (id: string) =>
        ChannelServices.getDeleteChannels(id as any)
    );

    const { data, mutate, isSuccess, isLoading } = mutation;

    return { data, mutate, isSuccess, isLoading };
}
    