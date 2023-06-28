export type QueryData =
  | {
      sortBy?: string;
      limit?: number;
      page?: number;
      totalPages?:number
    }
  | undefined;
