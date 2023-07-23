export interface Contact {
  [key: string]: string | number | undefined;
  id?: number;
  firstname: string;
  lastname: string;
  middlename: string;
  address: string;
  homephone: string;
  cellphone: string;
}
