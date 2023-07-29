import { useMutation, useQuery } from "react-query";
import { TopicServices } from "../topicServices";
import { getTopic } from "../types";

export function useTopic() {
  const { isLoading, data, isSuccess, mutate } = useMutation(
    "useTopic",
    (params: getTopic) => TopicServices.getTopicData(params)
  );
  const results = data?.results;

  return { data: results, isLoading, isSuccess, mutate };
}
