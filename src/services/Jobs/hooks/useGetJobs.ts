import { useQuery } from "react-query";
import { JobServices } from "../JobsServices";

export function useGetJobs() {
    const { isLoading, data, isSuccess } = useQuery("useOutro", () =>
        JobServices.getJobs()
    );
    return { data, isLoading, isSuccess };
}