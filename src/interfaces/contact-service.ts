import type { Contact, DataService } from './index';

export interface ContactService extends DataService<Contact, number> {
  filterContacts(contacts: Contact[], filter: string): Contact[];
  generateRandomContact(): Contact;
}
