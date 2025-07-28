
import { db } from '../db';
import { contactInfoTable } from '../db/schema';
import { type ContactInfo } from '../schema';

export const getContactInfo = async (): Promise<ContactInfo | null> => {
  try {
    const results = await db.select()
      .from(contactInfoTable)
      .limit(1)
      .execute();

    if (results.length === 0) {
      return null;
    }

    return results[0];
  } catch (error) {
    console.error('Failed to get contact info:', error);
    throw error;
  }
};
