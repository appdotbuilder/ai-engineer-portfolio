
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { projectsTable } from '../db/schema';
import { type CreateProjectInput, type UpdateProjectInput } from '../schema';
import { updateProject } from '../handlers/update_project';
import { eq } from 'drizzle-orm';

// Test data
const testProjectInput: CreateProjectInput = {
  title: 'Original Project',
  description: 'Original description',
  technologies: ['JavaScript', 'Node.js'],
  repository_url: 'https://github.com/example/original',
  demo_url: 'https://example.com/demo',
  video_url: 'https://youtube.com/watch?v=123',
  featured: false,
  display_order: 1
};

describe('updateProject', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should update a project with all fields', async () => {
    // Create initial project
    const created = await db.insert(projectsTable)
      .values(testProjectInput)
      .returning()
      .execute();
    const projectId = created[0].id;

    const updateInput: UpdateProjectInput = {
      id: projectId,
      title: 'Updated Project',
      description: 'Updated description',
      technologies: ['TypeScript', 'React'],
      repository_url: 'https://github.com/example/updated',
      demo_url: 'https://updated.com/demo',
      video_url: 'https://youtube.com/watch?v=456',
      featured: true,
      display_order: 2
    };

    const result = await updateProject(updateInput);

    expect(result.id).toEqual(projectId);
    expect(result.title).toEqual('Updated Project');
    expect(result.description).toEqual('Updated description');
    expect(result.technologies).toEqual(['TypeScript', 'React']);
    expect(result.repository_url).toEqual('https://github.com/example/updated');
    expect(result.demo_url).toEqual('https://updated.com/demo');
    expect(result.video_url).toEqual('https://youtube.com/watch?v=456');
    expect(result.featured).toEqual(true);
    expect(result.display_order).toEqual(2);
    expect(result.updated_at).toBeInstanceOf(Date);
    expect(result.created_at).toBeInstanceOf(Date);
  });

  it('should update only specified fields', async () => {
    // Create initial project
    const created = await db.insert(projectsTable)
      .values(testProjectInput)
      .returning()
      .execute();
    const projectId = created[0].id;

    const updateInput: UpdateProjectInput = {
      id: projectId,
      title: 'Partially Updated',
      featured: true
    };

    const result = await updateProject(updateInput);

    expect(result.id).toEqual(projectId);
    expect(result.title).toEqual('Partially Updated');
    expect(result.featured).toEqual(true);
    // Other fields should remain unchanged
    expect(result.description).toEqual('Original description');
    expect(result.technologies).toEqual(['JavaScript', 'Node.js']);
    expect(result.repository_url).toEqual('https://github.com/example/original');
    expect(result.demo_url).toEqual('https://example.com/demo');
    expect(result.video_url).toEqual('https://youtube.com/watch?v=123');
    expect(result.display_order).toEqual(1);
  });

  it('should handle null values correctly', async () => {
    // Create initial project
    const created = await db.insert(projectsTable)
      .values(testProjectInput)
      .returning()
      .execute();
    const projectId = created[0].id;

    const updateInput: UpdateProjectInput = {
      id: projectId,
      demo_url: null,
      video_url: null
    };

    const result = await updateProject(updateInput);

    expect(result.id).toEqual(projectId);
    expect(result.demo_url).toBeNull();
    expect(result.video_url).toBeNull();
    // Other fields should remain unchanged
    expect(result.title).toEqual('Original Project');
    expect(result.description).toEqual('Original description');
  });

  it('should save updates to database', async () => {
    // Create initial project
    const created = await db.insert(projectsTable)
      .values(testProjectInput)
      .returning()
      .execute();
    const projectId = created[0].id;

    const updateInput: UpdateProjectInput = {
      id: projectId,
      title: 'Database Updated',
      featured: true
    };

    await updateProject(updateInput);

    // Verify the update was saved to database
    const projects = await db.select()
      .from(projectsTable)
      .where(eq(projectsTable.id, projectId))
      .execute();

    expect(projects).toHaveLength(1);
    expect(projects[0].title).toEqual('Database Updated');
    expect(projects[0].featured).toEqual(true);
    expect(projects[0].description).toEqual('Original description');
    expect(projects[0].updated_at).toBeInstanceOf(Date);
  });

  it('should update the updated_at timestamp', async () => {
    // Create initial project
    const created = await db.insert(projectsTable)
      .values(testProjectInput)
      .returning()
      .execute();
    const projectId = created[0].id;
    const originalUpdatedAt = created[0].updated_at;

    // Wait a moment to ensure different timestamp
    await new Promise(resolve => setTimeout(resolve, 10));

    const updateInput: UpdateProjectInput = {
      id: projectId,
      title: 'Timestamp Test'
    };

    const result = await updateProject(updateInput);

    expect(result.updated_at).toBeInstanceOf(Date);
    expect(result.updated_at.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
  });

  it('should throw error for non-existent project', async () => {
    const updateInput: UpdateProjectInput = {
      id: 999999,
      title: 'Non-existent Project'
    };

    expect(updateProject(updateInput)).rejects.toThrow(/not found/i);
  });
});
