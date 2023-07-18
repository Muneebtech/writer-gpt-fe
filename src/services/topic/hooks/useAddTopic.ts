import { useMutation, useQueryClient } from "react-query";
import { TopicServices } from "../topicServices";
import { Topic } from "@/constants/Topic";

export function useAddTopic() {
    const invalidateClient = useQueryClient();
    const { isLoading, data, isSuccess,mutate } = useMutation(
        "useAddTopic",
        (data:Topic) => TopicServices.getPostTopic(data),
        {
            onSuccess() {
                invalidateClient.invalidateQueries("useAddTopic");
            },
        }
    );
    const results = data?.results;

    return { data: results, isLoading, isSuccess,mutate };
}
