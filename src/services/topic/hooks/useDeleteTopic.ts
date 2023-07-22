import { useMutation, useQueryClient } from "react-query";
import { TopicServices } from "../topicServices";


export function UseDeleteTopic() {
    const queryClient = useQueryClient();
    const { data, isLoading, isSuccess, mutate } = useMutation("", (id: string) =>
        TopicServices.getDeleteTopic(id),
        {
            onSuccess: () => {

                queryClient.invalidateQueries("useTopic"); // Assuming the query key for the list is "channelList"
            },
        }
    )

    return { data, isLoading, isSuccess, mutate }
}