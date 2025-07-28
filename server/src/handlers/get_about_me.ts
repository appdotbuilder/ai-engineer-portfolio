
import { db } from '../db';
import { aboutMeTable } from '../db/schema';
import { type AboutMe } from '../schema';

export const getAboutMe = async (): Promise<AboutMe | null> => {
  try {
    const results = await db.select()
      .from(aboutMeTable)
      .limit(1)
      .execute();

    if (results.length === 0) {
      return null;
    }

    return results[0];
  } catch (error) {
    console.error('Failed to fetch about me:', error);
    throw error;
  }
};
