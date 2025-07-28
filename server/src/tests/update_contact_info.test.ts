
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { contactInfoTable } from '../db/schema';
import { type UpdateContactInfoInput } from '../schema';
import { updateContactInfo } from '../handlers/update_contact_info';
import { eq } from 'drizzle-orm';

const testInput: UpdateContactInfoInput = {
  email: 'john.doe@example.com',
  phone: '+1-555-0123',
  linkedin_url: 'https://linkedin.com/in/johndoe',
  github_url: 'https://github.com/johndoe',
  twitter_url: 'https://twitter.com/johndoe',
  location: 'San Francisco, CA'
};

describe('updateContactInfo', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should create contact info when none exists', async () => {
    const result = await updateContactInfo(testInput);

    expect(result.email).toEqual('john.doe@example.com');
    expect(result.phone).toEqual('+1-555-0123');
    expect(result.linkedin_url).toEqual('https://linkedin.com/in/johndoe');
    expect(result.github_url).toEqual('https://github.com/johndoe');
    expect(result.twitter_url).toEqual('https://twitter.com/johndoe');
    expect(result.location).toEqual('San Francisco, CA');
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
    expect(result.updated_at).toBeInstanceOf(Date);
  });

  it('should save new contact info to database', async () => {
    const result = await updateContactInfo(testInput);

    const contactInfo = await db.select()
      .from(contactInfoTable)
      .where(eq(contactInfoTable.id, result.id))
      .execute();

    expect(contactInfo).toHaveLength(1);
    expect(contactInfo[0].email).toEqual('john.doe@example.com');
    expect(contactInfo[0].phone).toEqual('+1-555-0123');
    expect(contactInfo[0].linkedin_url).toEqual('https://linkedin.com/in/johndoe');
    expect(contactInfo[0].github_url).toEqual('https://github.com/johndoe');
    expect(contactInfo[0].twitter_url).toEqual('https://twitter.com/johndoe');
    expect(contactInfo[0].location).toEqual('San Francisco, CA');
  });

  it('should update existing contact info', async () => {
    // Create initial contact info
    await db.insert(contactInfoTable)
      .values({
        email: 'old@example.com',
        phone: '+1-555-9999',
        linkedin_url: 'https://linkedin.com/in/old',
        github_url: 'https://github.com/old',
        twitter_url: 'https://twitter.com/old',
        location: 'Old City'
      })
      .execute();

    const result = await updateContactInfo(testInput);

    expect(result.email).toEqual('john.doe@example.com');
    expect(result.phone).toEqual('+1-555-0123');
    expect(result.linkedin_url).toEqual('https://linkedin.com/in/johndoe');
    expect(result.github_url).toEqual('https://github.com/johndoe');
    expect(result.twitter_url).toEqual('https://twitter.com/johndoe');
    expect(result.location).toEqual('San Francisco, CA');
    expect(result.updated_at).toBeInstanceOf(Date);
  });

  it('should handle null values for optional fields', async () => {
    const inputWithNulls: UpdateContactInfoInput = {
      email: 'test@example.com',
      phone: null,
      linkedin_url: null,
      github_url: null,
      twitter_url: null,
      location: null
    };

    const result = await updateContactInfo(inputWithNulls);

    expect(result.email).toEqual('test@example.com');
    expect(result.phone).toBeNull();
    expect(result.linkedin_url).toBeNull();
    expect(result.github_url).toBeNull();
    expect(result.twitter_url).toBeNull();
    expect(result.location).toBeNull();
  });

  it('should only have one contact info record after multiple updates', async () => {
    // First update (creates record)
    await updateContactInfo(testInput);

    // Second update (updates existing record)
    const updatedInput: UpdateContactInfoInput = {
      email: 'updated@example.com',
      phone: '+1-555-4567',
      linkedin_url: 'https://linkedin.com/in/updated',
      github_url: 'https://github.com/updated',
      twitter_url: 'https://twitter.com/updated',
      location: 'New York, NY'
    };

    await updateContactInfo(updatedInput);

    // Verify only one record exists
    const allRecords = await db.select()
      .from(contactInfoTable)
      .execute();

    expect(allRecords).toHaveLength(1);
    expect(allRecords[0].email).toEqual('updated@example.com');
  });
});
