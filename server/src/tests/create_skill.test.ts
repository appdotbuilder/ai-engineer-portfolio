
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { skillsTable } from '../db/schema';
import { type CreateSkillInput } from '../schema';
import { createSkill } from '../handlers/create_skill';
import { eq, and, gte } from 'drizzle-orm';

// Simple test input
const testInput: CreateSkillInput = {
  name: 'TypeScript',
  category: 'Programming Languages',
  proficiency_level: 4,
  display_order: 1
};

describe('createSkill', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should create a skill', async () => {
    const result = await createSkill(testInput);

    // Basic field validation
    expect(result.name).toEqual('TypeScript');
    expect(result.category).toEqual('Programming Languages');
    expect(result.proficiency_level).toEqual(4);
    expect(result.display_order).toEqual(1);
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
    expect(result.updated_at).toBeInstanceOf(Date);
  });

  it('should save skill to database', async () => {
    const result = await createSkill(testInput);

    // Query using proper drizzle syntax
    const skills = await db.select()
      .from(skillsTable)
      .where(eq(skillsTable.id, result.id))
      .execute();

    expect(skills).toHaveLength(1);
    expect(skills[0].name).toEqual('TypeScript');
    expect(skills[0].category).toEqual('Programming Languages');
    expect(skills[0].proficiency_level).toEqual(4);
    expect(skills[0].display_order).toEqual(1);
    expect(skills[0].created_at).toBeInstanceOf(Date);
    expect(skills[0].updated_at).toBeInstanceOf(Date);
  });

  it('should handle default display_order from Zod', async () => {
    const inputWithoutDisplayOrder: CreateSkillInput = {
      name: 'JavaScript',
      category: 'Programming Languages',
      proficiency_level: 5,
      display_order: 0 // Zod default
    };

    const result = await createSkill(inputWithoutDisplayOrder);

    expect(result.display_order).toEqual(0);
    expect(result.name).toEqual('JavaScript');
    expect(result.proficiency_level).toEqual(5);
  });

  it('should query skills by category correctly', async () => {
    // Create multiple skills in different categories
    await createSkill(testInput);
    await createSkill({
      name: 'React',
      category: 'Frameworks',
      proficiency_level: 4,
      display_order: 0
    });
    await createSkill({
      name: 'Python',
      category: 'Programming Languages',
      proficiency_level: 3,
      display_order: 2
    });

    // Query skills by category
    const programmingLanguages = await db.select()
      .from(skillsTable)
      .where(eq(skillsTable.category, 'Programming Languages'))
      .execute();

    expect(programmingLanguages).toHaveLength(2);
    programmingLanguages.forEach(skill => {
      expect(skill.category).toEqual('Programming Languages');
      expect(skill.created_at).toBeInstanceOf(Date);
    });
  });

  it('should query skills by proficiency level correctly', async () => {
    // Create skills with different proficiency levels
    await createSkill(testInput); // proficiency_level: 4
    await createSkill({
      name: 'Beginner Skill',
      category: 'New Tech',
      proficiency_level: 2,
      display_order: 0
    });

    // Query skills with proficiency level >= 4
    const advancedSkills = await db.select()
      .from(skillsTable)
      .where(gte(skillsTable.proficiency_level, 4))
      .execute();

    expect(advancedSkills).toHaveLength(1);
    expect(advancedSkills[0].name).toEqual('TypeScript');
    expect(advancedSkills[0].proficiency_level).toEqual(4);
  });
});
