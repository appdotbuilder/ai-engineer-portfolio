
import { db } from '../db';
import { contactInfoTable } from '../db/schema';
import { type UpdateContactInfoInput, type ContactInfo } from '../schema';
import { eq } from 'drizzle-orm';

export const updateContactInfo = async (input: UpdateContactInfoInput): Promise<ContactInfo> => {
  try {
    // Check if contact info already exists
    const existing = await db.select()
      .from(contactInfoTable)
      .limit(1)
      .execute();

    if (existing.length > 0) {
      // Update existing record
      const result = await db.update(contactInfoTable)
        .set({
          email: input.email,
          phone: input.phone,
          linkedin_url: input.linkedin_url,
          github_url: input.github_url,
          twitter_url: input.twitter_url,
          location: input.location,
          updated_at: new Date()
        })
        .where(eq(contactInfoTable.id, existing[0].id))
        .returning()
        .execute();

      return result[0];
    } else {
      // Create new record
      const result = await db.insert(contactInfoTable)
        .values({
          email: input.email,
          phone: input.phone,
          linkedin_url: input.linkedin_url,
          github_url: input.github_url,
          twitter_url: input.twitter_url,
          location: input.location
        })
        .returning()
        .execute();

      return result[0];
    }
  } catch (error) {
    console.error('Contact info update failed:', error);
    throw error;
  }
};
