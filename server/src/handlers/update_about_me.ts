
import { db } from '../db';
import { aboutMeTable } from '../db/schema';
import { type UpdateAboutMeInput, type AboutMe } from '../schema';

export const updateAboutMe = async (input: UpdateAboutMeInput): Promise<AboutMe> => {
  try {
    // Check if an about me record exists
    const existingRecords = await db.select()
      .from(aboutMeTable)
      .limit(1)
      .execute();

    if (existingRecords.length === 0) {
      // Create new record if none exists
      const result = await db.insert(aboutMeTable)
        .values({
          title: input.title,
          description: input.description,
          profile_image_url: input.profile_image_url,
          resume_url: input.resume_url
        })
        .returning()
        .execute();

      return result[0];
    } else {
      // Update existing record
      const result = await db.update(aboutMeTable)
        .set({
          title: input.title,
          description: input.description,
          profile_image_url: input.profile_image_url,
          resume_url: input.resume_url,
          updated_at: new Date()
        })
        .returning()
        .execute();

      return result[0];
    }
  } catch (error) {
    console.error('About me update failed:', error);
    throw error;
  }
};
