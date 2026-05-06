export type ApiList<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type ListParams = {
  search?: string;
  ordering?: string;
  page?: number;
  page_size?: number;
};
