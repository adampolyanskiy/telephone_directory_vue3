export interface CsvToEntityMapper<T> {
  map(csv: string): T[];
}

export interface EntityToCsvMapper<T> {
  map(csv: T[]): string;
}
