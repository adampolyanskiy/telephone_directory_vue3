import type { Contact } from '@/interfaces';
import type { ContactService as IContactService } from '@/interfaces/contact-service';

class ContactService implements IContactService {
  getAll(): Promise<Contact[]> {
    throw new Error('Method not implemented.');
  }

  get(id: number): Promise<Contact> {
    throw new Error('Method not implemented.');
  }

  add(item: Contact): Promise<Contact> {
    throw new Error('Method not implemented.');
  }

  update(item: Contact): Promise<Contact> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export const contactService = new ContactService();
