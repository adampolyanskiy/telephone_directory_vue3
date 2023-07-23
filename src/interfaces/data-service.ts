export interface DataService<TData, TIndex> {
  getAll(): Promise<TData[]>;
  add(contact: TData): Promise<TIndex>;
  get(id: TIndex): Promise<TData | undefined>;
  delete(id: TIndex): Promise<void>;
  update(contact: TData): Promise<number>;
}
