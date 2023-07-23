import { LocalDB } from '@/models/db';
import { faker } from '@faker-js/faker';
import { Dexie } from 'dexie';
import { IDBKeyRange, indexedDB } from 'fake-indexeddb';
import { describe, expect, test } from 'vitest';

import { ContactService } from '../contact-service';

describe('Contact Service', () => {
  Dexie.dependencies.indexedDB = indexedDB;
  Dexie.dependencies.IDBKeyRange = IDBKeyRange;
  const db = new LocalDB();
  const service = new ContactService(db);

  test('check if table is empty', async () => {
    const contacts = await service.getAll();
    expect(contacts).toHaveLength(0);
  });

  test('get non-existing', async () => {
    const contact = await service.get(1);
    expect(contact).toBeUndefined();
  });

  test('add', async () => {
    const id = await service.add({
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      middlename: faker.person.middleName(),
      cellphone: faker.phone.number(),
      homephone: faker.phone.number(),
      address: faker.location.city()
    });

    expect(service.get(id)).toBeDefined();
  });

  test('update', async () => {
    const contact = await service.get(1);

    if (!contact) {
      throw new Error();
    }

    contact.firstname = faker.person.firstName();

    await service.update(contact);

    expect(await service.get(1)).toBeDefined();
  });

  test('delete', async () => {
    await service.delete(1);
    expect(await service.get(1)).toBeUndefined();
  });
});
