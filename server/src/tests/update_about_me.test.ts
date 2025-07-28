
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { aboutMeTable } from '../db/schema';
import { type UpdateAboutMeInput } from '../schema';
import { updateAboutMe } from '../handlers/update_about_me';

const testInput: UpdateAboutMeInput = {
  title: 'Software Engineer',
  description: 'Passionate about creating innovative solutions',
  profile_image_url: 'https://example.com/profile.jpg',
  resume_url: 'https://example.com/resume.pdf'
};

describe('updateAboutMe', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should create about me record when none exists', async () => {
    const result = await updateAboutMe(testInput);

    expect(result.title).toEqual('Software Engineer');
    expect(result.description).toEqual(testInput.description);
    expect(result.profile_image_url).toEqual('https://example.com/profile.jpg');
    expect(result.resume_url).toEqual('https://example.com/resume.pdf');
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
    expect(result.updated_at).toBeInstanceOf(Date);
  });

  it('should save new record to database', async () => {
    const result = await updateAboutMe(testInput);

    const records = await db.select()
      .from(aboutMeTable)
      .execute();

    expect(records).toHaveLength(1);
    expect(records[0].id).toEqual(result.id);
    expect(records[0].title).toEqual('Software Engineer');
    expect(records[0].description).toEqual(testInput.description);
    expect(records[0].profile_image_url).toEqual('https://example.com/profile.jpg');
    expect(records[0].resume_url).toEqual('https://example.com/resume.pdf');
  });

  it('should update existing record when one exists', async () => {
    // Create initial record
    await db.insert(aboutMeTable)
      .values({
        title: 'Old Title',
        description: 'Old description',
        profile_image_url: 'https://old.com/image.jpg',
        resume_url: 'https://old.com/resume.pdf'
      })
      .execute();

    const updateInput: UpdateAboutMeInput = {
      title: 'Updated Engineer',
      description: 'Updated passionate description',
      profile_image_url: 'https://new.com/profile.jpg',
      resume_url: 'https://new.com/resume.pdf'
    };

    const result = await updateAboutMe(updateInput);

    expect(result.title).toEqual('Updated Engineer');
    expect(result.description).toEqual('Updated passionate description');
    expect(result.profile_image_url).toEqual('https://new.com/profile.jpg');
    expect(result.resume_url).toEqual('https://new.com/resume.pdf');
    expect(result.updated_at).toBeInstanceOf(Date);
  });

  it('should maintain only one record in database after update', async () => {
    // Create initial record
    await db.insert(aboutMeTable)
      .values({
        title: 'Initial Title',
        description: 'Initial description',
        profile_image_url: null,
        resume_url: null
      })
      .execute();

    await updateAboutMe(testInput);

    const records = await db.select()
      .from(aboutMeTable)
      .execute();

    expect(records).toHaveLength(1);
    expect(records[0].title).toEqual('Software Engineer');
    expect(records[0].description).toEqual(testInput.description);
  });

  it('should handle null values correctly', async () => {
    const inputWithNulls: UpdateAboutMeInput = {
      title: 'Engineer',
      description: 'Description only',
      profile_image_url: null,
      resume_url: null
    };

    const result = await updateAboutMe(inputWithNulls);

    expect(result.title).toEqual('Engineer');
    expect(result.description).toEqual('Description only');
    expect(result.profile_image_url).toBeNull();
    expect(result.resume_url).toBeNull();
  });

  it('should update timestamps correctly', async () => {
    // Create initial record
    const initialRecord = await db.insert(aboutMeTable)
      .values({
        title: 'Initial',
        description: 'Initial desc',
        profile_image_url: null,
        resume_url: null
      })
      .returning()
      .execute();

    const initialUpdatedAt = initialRecord[0].updated_at;

    // Wait a small amount to ensure timestamp difference
    await new Promise(resolve => setTimeout(resolve, 10));

    const result = await updateAboutMe(testInput);

    expect(result.updated_at).toBeInstanceOf(Date);
    expect(result.updated_at.getTime()).toBeGreaterThan(initialUpdatedAt.getTime());
  });
});
