export interface DataService<DataType, DataIdType> {
  getAll(): Promise<DataType[]>
  create(contact: DataType): Promise<DataType>
  delete(id: DataIdType): Promise<void>
  update(contact: DataType): Promise<void>
}
