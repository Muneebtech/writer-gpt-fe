import { useMutation, useQueryClient } from "react-query";
import { TopicServices } from "../topicServices";
import { Topic } from "@/constants/Topic";
import { updateTopic } from "../types";

export function useUpdateTopic() {
  const invalidateClient = useQueryClient();
  const { isLoading, data, isSuccess, mutate } = useMutation(
    "useAddTopic",
    (data: updateTopic) => TopicServices.updateTopic(data),
    {
      onSuccess() {
        invalidateClient.invalidateQueries("useTopic");
      },
    }
  );
  const results = data?.results;

  return { data: results, isLoading, isSuccess, mutate };
}
