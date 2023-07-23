import { ERRORS } from '@/constants/errors';
import type { Contact, ContactService as IContactService } from '@/interfaces';
import { db } from '@/models/db';

class ContactService implements IContactService {
  async getAll(): Promise<Contact[]> {
    return await db.contacts.toArray();
  }

  async get(id: number): Promise<Contact | undefined> {
    return await db.contacts.get(id);
  }

  async add(item: Contact): Promise<number> {
    return (await db.contacts.add(item)) as number;
  }

  async update(item: Contact): Promise<number> {
    if (!item.id) {
      throw new Error(ERRORS.NO_ITEM_ID.message);
    }

    return await db.contacts.update(item.id, item);
  }

  async delete(id: number): Promise<void> {
    if (!id) {
      throw new Error(ERRORS.NO_ITEM_ID.message);
    }

    return await db.contacts.delete(id);
  }
}

export const contactService = new ContactService();
