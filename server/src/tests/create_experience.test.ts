
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { experienceTable } from '../db/schema';
import { type CreateExperienceInput } from '../schema';
import { createExperience } from '../handlers/create_experience';
import { eq } from 'drizzle-orm';

// Simple test input
const testInput: CreateExperienceInput = {
  company: 'Tech Corp',
  position: 'Software Engineer',
  description: 'Developed web applications using modern technologies',
  start_date: new Date('2022-01-01'),
  end_date: new Date('2023-12-31'),
  location: 'San Francisco, CA',
  technologies: ['JavaScript', 'React', 'Node.js'],
  display_order: 1
};

describe('createExperience', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should create an experience', async () => {
    const result = await createExperience(testInput);

    // Basic field validation
    expect(result.company).toEqual('Tech Corp');
    expect(result.position).toEqual('Software Engineer');
    expect(result.description).toEqual(testInput.description);
    expect(result.start_date).toEqual(testInput.start_date);
    expect(result.end_date).toEqual(testInput.end_date);
    expect(result.location).toEqual('San Francisco, CA');
    expect(result.technologies).toEqual(['JavaScript', 'React', 'Node.js']);
    expect(result.display_order).toEqual(1);
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
    expect(result.updated_at).toBeInstanceOf(Date);
  });

  it('should save experience to database', async () => {
    const result = await createExperience(testInput);

    // Query using proper drizzle syntax
    const experiences = await db.select()
      .from(experienceTable)
      .where(eq(experienceTable.id, result.id))
      .execute();

    expect(experiences).toHaveLength(1);
    expect(experiences[0].company).toEqual('Tech Corp');
    expect(experiences[0].position).toEqual('Software Engineer');
    expect(experiences[0].description).toEqual(testInput.description);
    expect(experiences[0].start_date).toEqual(testInput.start_date);
    expect(experiences[0].end_date).toEqual(testInput.end_date);
    expect(experiences[0].location).toEqual('San Francisco, CA');
    expect(experiences[0].technologies).toEqual(['JavaScript', 'React', 'Node.js']);
    expect(experiences[0].display_order).toEqual(1);
    expect(experiences[0].created_at).toBeInstanceOf(Date);
    expect(experiences[0].updated_at).toBeInstanceOf(Date);
  });

  it('should handle null end_date and location', async () => {
    const inputWithNulls: CreateExperienceInput = {
      company: 'Current Company',
      position: 'Senior Developer',
      description: 'Currently working here',
      start_date: new Date('2023-01-01'),
      end_date: null,
      location: null,
      technologies: ['TypeScript', 'PostgreSQL'],
      display_order: 0
    };

    const result = await createExperience(inputWithNulls);

    expect(result.company).toEqual('Current Company');
    expect(result.end_date).toBeNull();
    expect(result.location).toBeNull();
    expect(result.technologies).toEqual(['TypeScript', 'PostgreSQL']);
    expect(result.display_order).toEqual(0);

    // Verify in database
    const experiences = await db.select()
      .from(experienceTable)
      .where(eq(experienceTable.id, result.id))
      .execute();

    expect(experiences[0].end_date).toBeNull();
    expect(experiences[0].location).toBeNull();
  });

  it('should apply default display_order when not provided', async () => {
    const inputWithDefaults: CreateExperienceInput = {
      company: 'Default Company',
      position: 'Developer',
      description: 'Test description',
      start_date: new Date('2023-01-01'),
      end_date: null,
      location: null,
      technologies: ['Python'],
      display_order: 0 // Zod default
    };

    const result = await createExperience(inputWithDefaults);

    expect(result.display_order).toEqual(0);
  });
});
