
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { aboutMeTable } from '../db/schema';
import { getAboutMe } from '../handlers/get_about_me';

describe('getAboutMe', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return null when no about me exists', async () => {
    const result = await getAboutMe();
    expect(result).toBeNull();
  });

  it('should return about me when it exists', async () => {
    // Create test about me record
    const testAboutMe = {
      title: 'Software Developer',
      description: 'Passionate full-stack developer with 5 years of experience',
      profile_image_url: 'https://example.com/profile.jpg',
      resume_url: 'https://example.com/resume.pdf'
    };

    await db.insert(aboutMeTable)
      .values(testAboutMe)
      .execute();

    const result = await getAboutMe();

    expect(result).not.toBeNull();
    expect(result!.title).toEqual('Software Developer');
    expect(result!.description).toEqual('Passionate full-stack developer with 5 years of experience');
    expect(result!.profile_image_url).toEqual('https://example.com/profile.jpg');
    expect(result!.resume_url).toEqual('https://example.com/resume.pdf');
    expect(result!.id).toBeDefined();
    expect(result!.created_at).toBeInstanceOf(Date);
    expect(result!.updated_at).toBeInstanceOf(Date);
  });

  it('should return first record when multiple about me records exist', async () => {
    // Create multiple about me records
    const firstAboutMe = {
      title: 'First Developer',
      description: 'First description',
      profile_image_url: null,
      resume_url: null
    };

    const secondAboutMe = {
      title: 'Second Developer',
      description: 'Second description',
      profile_image_url: 'https://example.com/second.jpg',
      resume_url: 'https://example.com/second.pdf'
    };

    await db.insert(aboutMeTable)
      .values([firstAboutMe, secondAboutMe])
      .execute();

    const result = await getAboutMe();

    expect(result).not.toBeNull();
    expect(result!.title).toEqual('First Developer');
    expect(result!.description).toEqual('First description');
    expect(result!.profile_image_url).toBeNull();
    expect(result!.resume_url).toBeNull();
  });

  it('should handle nullable fields correctly', async () => {
    // Create about me with null optional fields
    const testAboutMe = {
      title: 'Minimal Profile',
      description: 'Just the basics',
      profile_image_url: null,
      resume_url: null
    };

    await db.insert(aboutMeTable)
      .values(testAboutMe)
      .execute();

    const result = await getAboutMe();

    expect(result).not.toBeNull();
    expect(result!.title).toEqual('Minimal Profile');
    expect(result!.description).toEqual('Just the basics');
    expect(result!.profile_image_url).toBeNull();
    expect(result!.resume_url).toBeNull();
  });
});
