import { useQuery } from "react-query";
import { TopicServices } from "../topicServices";

export function useTopic() {
    const { isLoading, data, isSuccess } = useQuery("useTopic", () =>
        TopicServices.getTopicData()
    )
    return { data, isLoading, isSuccess }
}