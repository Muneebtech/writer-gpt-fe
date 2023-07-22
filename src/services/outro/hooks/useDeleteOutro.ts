import { useMutation, useQueryClient } from "react-query";
import { UseOutroData } from "../OutroServices";


export function UseDeleteOutro() {
    const queryClient = useQueryClient();
    const { data, isLoading, isSuccess, mutate } = useMutation("", (id: string) =>
        UseOutroData.deleteOutro(id),
        {
            onSuccess: () => {

                queryClient.invalidateQueries("useOutro"); // Assuming the query key for the list is "channelList"
            },
        }
    )

    return { data, isLoading, isSuccess, mutate }
}