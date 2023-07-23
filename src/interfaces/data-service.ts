export interface DataService<DataType, DataIdType> {
  getAll(): Promise<DataType[]>
  create(contact: DataType): Promise<DataType>
  get(id: DataIdType): Promise<DataType>
  delete(id: DataIdType): Promise<void>
  update(contact: DataType): Promise<void>
}
