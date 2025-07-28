
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { skillsTable } from '../db/schema';
import { type CreateSkillInput } from '../schema';
import { getSkills } from '../handlers/get_skills';

// Test skills data
const testSkills: CreateSkillInput[] = [
  {
    name: 'JavaScript',
    category: 'Programming Languages',
    proficiency_level: 5,
    display_order: 1
  },
  {
    name: 'TypeScript',
    category: 'Programming Languages',
    proficiency_level: 4,
    display_order: 2
  },
  {
    name: 'React',
    category: 'Frameworks',
    proficiency_level: 5,
    display_order: 1
  },
  {
    name: 'Node.js',
    category: 'Frameworks',
    proficiency_level: 4,
    display_order: 2
  },
  {
    name: 'PostgreSQL',
    category: 'Databases',
    proficiency_level: 3,
    display_order: 1
  }
];

describe('getSkills', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return empty array when no skills exist', async () => {
    const result = await getSkills();
    expect(result).toEqual([]);
  });

  it('should return all skills ordered by category and display_order', async () => {
    // Insert test skills
    await db.insert(skillsTable)
      .values(testSkills)
      .execute();

    const result = await getSkills();

    expect(result).toHaveLength(5);

    // Verify ordering: category alphabetically, then display_order within category
    expect(result[0].category).toEqual('Databases');
    expect(result[0].name).toEqual('PostgreSQL');

    expect(result[1].category).toEqual('Frameworks');
    expect(result[1].name).toEqual('React');
    expect(result[1].display_order).toEqual(1);

    expect(result[2].category).toEqual('Frameworks');
    expect(result[2].name).toEqual('Node.js');
    expect(result[2].display_order).toEqual(2);

    expect(result[3].category).toEqual('Programming Languages');
    expect(result[3].name).toEqual('JavaScript');
    expect(result[3].display_order).toEqual(1);

    expect(result[4].category).toEqual('Programming Languages');
    expect(result[4].name).toEqual('TypeScript');
    expect(result[4].display_order).toEqual(2);
  });

  it('should return skills with all required fields', async () => {
    const skillInput: CreateSkillInput = {
      name: 'Python',
      category: 'Programming Languages',
      proficiency_level: 4,
      display_order: 3
    };

    await db.insert(skillsTable)
      .values(skillInput)
      .execute();

    const result = await getSkills();

    expect(result).toHaveLength(1);
    const skill = result[0];

    expect(skill.id).toBeDefined();
    expect(skill.name).toEqual('Python');
    expect(skill.category).toEqual('Programming Languages');
    expect(skill.proficiency_level).toEqual(4);
    expect(skill.display_order).toEqual(3);
    expect(skill.created_at).toBeInstanceOf(Date);
    expect(skill.updated_at).toBeInstanceOf(Date);
  });

  it('should handle mixed display orders correctly', async () => {
    const mixedOrderSkills: CreateSkillInput[] = [
      {
        name: 'Skill C',
        category: 'Category A',
        proficiency_level: 3,
        display_order: 3
      },
      {
        name: 'Skill A',
        category: 'Category A',
        proficiency_level: 5,
        display_order: 1
      },
      {
        name: 'Skill B',
        category: 'Category A',
        proficiency_level: 4,
        display_order: 2
      }
    ];

    await db.insert(skillsTable)
      .values(mixedOrderSkills)
      .execute();

    const result = await getSkills();

    expect(result).toHaveLength(3);
    expect(result[0].name).toEqual('Skill A');
    expect(result[0].display_order).toEqual(1);
    expect(result[1].name).toEqual('Skill B');
    expect(result[1].display_order).toEqual(2);
    expect(result[2].name).toEqual('Skill C');
    expect(result[2].display_order).toEqual(3);
  });
});
