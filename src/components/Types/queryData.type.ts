export type QueryData =
  | {
      sortBy?: string;
      limit?: number;
      page?: number;
    }
  | undefined;
