export interface DataService<TData, TIndex> {
  getAll(): Promise<TData[]>;
  add(contact: TData): Promise<TData>;
  get(id: TIndex): Promise<TData>;
  delete(id: TIndex): Promise<void>;
  update(contact: TData): Promise<TData>;
}
