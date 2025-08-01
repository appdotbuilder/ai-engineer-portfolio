
import { db } from '../db';
import { skillsTable } from '../db/schema';
import { type CreateSkillInput, type Skill } from '../schema';

export const createSkill = async (input: CreateSkillInput): Promise<Skill> => {
  try {
    // Insert skill record
    const result = await db.insert(skillsTable)
      .values({
        name: input.name,
        category: input.category,
        proficiency_level: input.proficiency_level,
        display_order: input.display_order
      })
      .returning()
      .execute();

    // Return the created skill
    return result[0];
  } catch (error) {
    console.error('Skill creation failed:', error);
    throw error;
  }
};
