
import { db } from '../db';
import { experienceTable } from '../db/schema';
import { type Experience } from '../schema';
import { desc } from 'drizzle-orm';

export const getExperience = async (): Promise<Experience[]> => {
  try {
    const results = await db.select()
      .from(experienceTable)
      .orderBy(desc(experienceTable.start_date))
      .execute();

    return results;
  } catch (error) {
    console.error('Experience retrieval failed:', error);
    throw error;
  }
};
