import { useMutation, useQueryClient } from "react-query";
import { ChannelServices } from "../channelServices";

export function useDeleteChannels() {
    const queryClient = useQueryClient();

    const mutation = useMutation("DeleteChannels", (id: string) =>
        ChannelServices.getDeleteChannels(id as any)
    );

    const { data, mutate, isSuccess, isLoading } = mutation;

    // This function will be called when the mutation is successful
    const onSuccess = () => {
        queryClient.invalidateQueries("useGetChannels");
    };

    return { data, mutate, isSuccess, isLoading, onSuccess };
}
    