
import { db } from '../db';
import { skillsTable } from '../db/schema';
import { type Skill } from '../schema';
import { asc } from 'drizzle-orm';

export const getSkills = async (): Promise<Skill[]> => {
  try {
    const results = await db.select()
      .from(skillsTable)
      .orderBy(asc(skillsTable.category), asc(skillsTable.display_order))
      .execute();

    return results;
  } catch (error) {
    console.error('Skills retrieval failed:', error);
    throw error;
  }
};
