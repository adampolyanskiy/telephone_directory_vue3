export interface DataService<TData, TIndex> {
  getAll(): Promise<TData[]>;
  add(item: TData): Promise<TIndex>;
  get(id: TIndex): Promise<TData | undefined>;
  delete(id: TIndex): Promise<void>;
  update(item: TData): Promise<TIndex>;
  bulkPut(items: TData[]): Promise<TIndex>;
}
