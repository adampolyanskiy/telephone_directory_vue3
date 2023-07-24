import type { Contact, CsvToEntityMapper, EntityToCsvMapper } from '@/interfaces';
import { csvFormat, csvParse } from 'd3-dsv';

export class CsvToContactMapper implements CsvToEntityMapper<Contact> {
  map(csv: string): Contact[] {
    const items = csvParse(csv);
    debugger;
    return [];
  }
}

export class ContactToCsvMapper implements EntityToCsvMapper<Contact> {
  map(contacts: Contact[]): string {
    return csvFormat(contacts);
  }
}

const csvToContactMapper = new CsvToContactMapper();
const contactToCsvMapper = new ContactToCsvMapper();

export { csvToContactMapper, contactToCsvMapper };
