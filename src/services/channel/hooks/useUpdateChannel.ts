import { useMutation, useQueryClient } from "react-query";
import { ChannelServices } from "../channelServices";
import useNotification from "@/hooks/useNotificaitons";

export function useUpdateChannel() {
  const queryClient = useQueryClient();
  const { data, isLoading, isSuccess, mutate } = useMutation<
    void,
    unknown,
    { id: string; newData: FormData }
  >("updateChannel", data => ChannelServices.updateChannel(data), {
    onError: () => {
      handleOnError();
    },
    onSuccess: () => {
      handleOnSuccess();
    },
  });

  const handleOnError = () => {
    // useNotification({
    //   message: "An Error Occurred!",
    //   duration: 3000,
    //   type: "error",
    // });
  };

  const handleOnSuccess = () => {
    // useNotification({
    //   message: "Successfully Updated Channel!",
    //   duration: 3000,
    //   type: "success",
    // });

    queryClient.invalidateQueries("useGetChannels"); // Assuming the query key for the list is "useGetChannels"
  };
  return { data, isLoading, isSuccess, mutate };
}
