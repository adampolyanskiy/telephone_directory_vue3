import { ERRORS } from '@/constants/errors';
import type { Contact, ContactService as IContactService } from '@/interfaces';
import { LocalDB, db } from '@/models/db';
import { fakerRU as faker } from '@faker-js/faker';

export class ContactService implements IContactService {
  constructor(private db: LocalDB = db) {}

  async getAll(): Promise<Contact[]> {
    return await this.db.contacts.toArray();
  }

  async get(id: number): Promise<Contact | undefined> {
    return await this.db.contacts.get(id);
  }

  async add(item: Contact): Promise<number> {
    const firstname = item.firstname;
    const middlename = item.middlename;
    const lastname = item.lastname;
    const address = item.address;

    const duplicates = this.db.contacts.where({ firstname, middlename, lastname, address });

    if ((await duplicates.count()) > 0) {
      return -1;
    }

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

  filterContacts(contacts: Contact[], filter: string): Contact[] {
    return contacts.filter((contact) => {
      for (const key in contact) {
        const value = contact[key];

        if (typeof value !== 'string') {
          continue;
        }

        if ((value as string).toLocaleUpperCase().indexOf(filter.toLocaleUpperCase()) > -1) {
          return true;
        }
      }

      return false;
    });
  }

  generateRandomContact(): Contact {
    return {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      middlename: faker.person.middleName(),
      cellphone: faker.phone.number(),
      homephone: faker.phone.number(),
      address: faker.location.city()
    };
  }
}

export const contactService = new ContactService(db);
