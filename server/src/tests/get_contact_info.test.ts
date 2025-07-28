
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { contactInfoTable } from '../db/schema';
import { getContactInfo } from '../handlers/get_contact_info';

describe('getContactInfo', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return null when no contact info exists', async () => {
    const result = await getContactInfo();
    expect(result).toBeNull();
  });

  it('should return contact info when it exists', async () => {
    // Create test contact info
    const testContactInfo = {
      email: 'test@example.com',
      phone: '+1-555-0123',
      linkedin_url: 'https://linkedin.com/in/testuser',
      github_url: 'https://github.com/testuser',
      twitter_url: 'https://twitter.com/testuser',
      location: 'San Francisco, CA'
    };

    await db.insert(contactInfoTable)
      .values(testContactInfo)
      .execute();

    const result = await getContactInfo();

    expect(result).not.toBeNull();
    expect(result!.email).toEqual('test@example.com');
    expect(result!.phone).toEqual('+1-555-0123');
    expect(result!.linkedin_url).toEqual('https://linkedin.com/in/testuser');
    expect(result!.github_url).toEqual('https://github.com/testuser');
    expect(result!.twitter_url).toEqual('https://twitter.com/testuser');
    expect(result!.location).toEqual('San Francisco, CA');
    expect(result!.id).toBeDefined();
    expect(result!.created_at).toBeInstanceOf(Date);
    expect(result!.updated_at).toBeInstanceOf(Date);
  });

  it('should return only the first contact info when multiple exist', async () => {
    // Create multiple contact info entries
    const contactInfo1 = {
      email: 'first@example.com',
      phone: '+1-555-0001',
      linkedin_url: 'https://linkedin.com/in/first',
      github_url: 'https://github.com/first',
      twitter_url: null,
      location: 'New York, NY'
    };

    const contactInfo2 = {
      email: 'second@example.com',
      phone: '+1-555-0002',
      linkedin_url: 'https://linkedin.com/in/second',
      github_url: 'https://github.com/second',
      twitter_url: 'https://twitter.com/second',
      location: 'Los Angeles, CA'
    };

    await db.insert(contactInfoTable)
      .values([contactInfo1, contactInfo2])
      .execute();

    const result = await getContactInfo();

    expect(result).not.toBeNull();
    expect(result!.email).toEqual('first@example.com');
    expect(result!.phone).toEqual('+1-555-0001');
    expect(result!.linkedin_url).toEqual('https://linkedin.com/in/first');
    expect(result!.github_url).toEqual('https://github.com/first');
    expect(result!.twitter_url).toBeNull();
    expect(result!.location).toEqual('New York, NY');
  });

  it('should handle contact info with nullable fields', async () => {
    // Create contact info with minimal required fields
    const minimalContactInfo = {
      email: 'minimal@example.com',
      phone: null,
      linkedin_url: null,
      github_url: null,
      twitter_url: null,
      location: null
    };

    await db.insert(contactInfoTable)
      .values(minimalContactInfo)
      .execute();

    const result = await getContactInfo();

    expect(result).not.toBeNull();
    expect(result!.email).toEqual('minimal@example.com');
    expect(result!.phone).toBeNull();
    expect(result!.linkedin_url).toBeNull();
    expect(result!.github_url).toBeNull();
    expect(result!.twitter_url).toBeNull();
    expect(result!.location).toBeNull();
    expect(result!.id).toBeDefined();
    expect(result!.created_at).toBeInstanceOf(Date);
    expect(result!.updated_at).toBeInstanceOf(Date);
  });
});
