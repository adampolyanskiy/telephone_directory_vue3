import { ERRORS } from '@/constants/errors';
import type { Contact, ContactService as IContactService } from '@/interfaces';
import { LocalDB, db } from '@/models/db';

class ContactService implements IContactService {
  constructor(private db: LocalDB = db) {}

  async getAll(): Promise<Contact[]> {
    return await this.db.contacts.toArray();
  }

  async get(id: number): Promise<Contact | undefined> {
    return await this.db.contacts.get(id);
  }

  async add(item: Contact): Promise<number> {
    return (await this.db.contacts.add(item)) as number;
  }

  async update(item: Contact): Promise<number> {
    if (!item.id) {
      throw new Error(ERRORS.NO_ITEM_ID.message);
    }

    return await this.db.contacts.update(item.id, item);
  }

  async delete(id: number): Promise<void> {
    if (!id) {
      throw new Error(ERRORS.NO_ITEM_ID.message);
    }

    return await this.db.contacts.delete(id);
  }
}

export const contactService = new ContactService(db);
