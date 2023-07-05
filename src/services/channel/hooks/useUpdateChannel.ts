import { useQuery } from "react-query";
import { ChannelServices } from "../channelServices";

export function useUpdateChannel(id: string) {
    const { data, isLoading, isSuccess } = useQuery('updateChannel', () =>
        ChannelServices.getUpdateChannels(id)
    )
    return { data, isLoading, isSuccess }
}