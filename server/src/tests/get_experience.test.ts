
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { experienceTable } from '../db/schema';
import { type CreateExperienceInput } from '../schema';
import { getExperience } from '../handlers/get_experience';

const testExperience1: CreateExperienceInput = {
  company: 'Tech Corp',
  position: 'Senior Developer',
  description: 'Developed web applications using React and Node.js',
  start_date: new Date('2022-01-01'),
  end_date: new Date('2023-06-30'),
  location: 'San Francisco, CA',
  technologies: ['React', 'Node.js', 'TypeScript'],
  display_order: 0
};

const testExperience2: CreateExperienceInput = {
  company: 'StartupXYZ',
  position: 'Full Stack Engineer',
  description: 'Built scalable backend services and APIs',
  start_date: new Date('2023-07-01'),
  end_date: null,
  location: 'Remote',
  technologies: ['Python', 'FastAPI', 'PostgreSQL'],
  display_order: 0
};

const testExperience3: CreateExperienceInput = {
  company: 'Early Company',
  position: 'Junior Developer',
  description: 'Maintained legacy systems and learned best practices',
  start_date: new Date('2020-03-15'),
  end_date: new Date('2021-12-31'),
  location: 'New York, NY',
  technologies: ['Java', 'Spring', 'MySQL'],
  display_order: 0
};

describe('getExperience', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return empty array when no experience exists', async () => {
    const result = await getExperience();
    expect(result).toEqual([]);
  });

  it('should return all experience entries', async () => {
    // Insert test data
    await db.insert(experienceTable).values([
      {
        company: testExperience1.company,
        position: testExperience1.position,
        description: testExperience1.description,
        start_date: testExperience1.start_date,
        end_date: testExperience1.end_date,
        location: testExperience1.location,
        technologies: testExperience1.technologies,
        display_order: testExperience1.display_order
      },
      {
        company: testExperience2.company,
        position: testExperience2.position,
        description: testExperience2.description,
        start_date: testExperience2.start_date,
        end_date: testExperience2.end_date,
        location: testExperience2.location,
        technologies: testExperience2.technologies,
        display_order: testExperience2.display_order
      }
    ]).execute();

    const result = await getExperience();

    expect(result).toHaveLength(2);
    
    // Check that all expected fields are present
    result.forEach(experience => {
      expect(experience.id).toBeDefined();
      expect(experience.company).toBeDefined();
      expect(experience.position).toBeDefined();
      expect(experience.description).toBeDefined();
      expect(experience.start_date).toBeInstanceOf(Date);
      expect(experience.technologies).toBeInstanceOf(Array);
      expect(experience.display_order).toBeDefined();
      expect(experience.created_at).toBeInstanceOf(Date);
      expect(experience.updated_at).toBeInstanceOf(Date);
    });

    // Check specific values
    const companies = result.map(exp => exp.company);
    expect(companies).toContain('Tech Corp');
    expect(companies).toContain('StartupXYZ');
  });

  it('should return experience ordered by start_date (most recent first)', async () => {
    // Insert test data in random order
    await db.insert(experienceTable).values([
      {
        company: testExperience1.company,
        position: testExperience1.position,
        description: testExperience1.description,
        start_date: testExperience1.start_date, // 2022-01-01
        end_date: testExperience1.end_date,
        location: testExperience1.location,
        technologies: testExperience1.technologies,
        display_order: testExperience1.display_order
      },
      {
        company: testExperience3.company,
        position: testExperience3.position,
        description: testExperience3.description,
        start_date: testExperience3.start_date, // 2020-03-15
        end_date: testExperience3.end_date,
        location: testExperience3.location,
        technologies: testExperience3.technologies,
        display_order: testExperience3.display_order
      },
      {
        company: testExperience2.company,
        position: testExperience2.position,
        description: testExperience2.description,
        start_date: testExperience2.start_date, // 2023-07-01
        end_date: testExperience2.end_date,
        location: testExperience2.location,
        technologies: testExperience2.technologies,
        display_order: testExperience2.display_order
      }
    ]).execute();

    const result = await getExperience();

    expect(result).toHaveLength(3);
    
    // Should be ordered by start_date descending (most recent first)
    expect(result[0].company).toEqual('StartupXYZ'); // 2023-07-01
    expect(result[1].company).toEqual('Tech Corp');   // 2022-01-01
    expect(result[2].company).toEqual('Early Company'); // 2020-03-15

    // Verify the dates are in descending order
    expect(result[0].start_date >= result[1].start_date).toBe(true);
    expect(result[1].start_date >= result[2].start_date).toBe(true);
  });

  it('should handle null end_date correctly', async () => {
    // Insert experience with null end_date (current position)
    await db.insert(experienceTable).values({
      company: testExperience2.company,
      position: testExperience2.position,
      description: testExperience2.description,
      start_date: testExperience2.start_date,
      end_date: testExperience2.end_date, // null
      location: testExperience2.location,
      technologies: testExperience2.technologies,
      display_order: testExperience2.display_order
    }).execute();

    const result = await getExperience();

    expect(result).toHaveLength(1);
    expect(result[0].company).toEqual('StartupXYZ');
    expect(result[0].end_date).toBeNull();
    expect(result[0].location).toEqual('Remote');
  });
});
