import type { Contact } from '@/interfaces';
import { Dexie, type Table } from 'dexie';

export class LocalDB extends Dexie {
  contacts!: Table<Contact>;

  constructor() {
    super('LocalDB');
    this.version(1).stores({
      contacts: '++id, firstname, middlename, lastname, address, homephone, cellphone'
    });
  }
}

export const db = new LocalDB();
