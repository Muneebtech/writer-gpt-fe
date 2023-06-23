import { useQuery } from "react-query";
import { TopicServices } from "../topicServices";

export function useTopic() {
  const { isLoading, data, isSuccess } = useQuery(
    "useTopic",
    () => TopicServices.getTopicData(),
    {
      cacheTime: 300000,
      staleTime: 300000,
    }
  );
  return { data, isLoading, isSuccess };
}
