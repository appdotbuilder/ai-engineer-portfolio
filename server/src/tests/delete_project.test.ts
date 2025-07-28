
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { projectsTable } from '../db/schema';
import { type DeleteItemInput, type CreateProjectInput } from '../schema';
import { deleteProject } from '../handlers/delete_project';
import { eq } from 'drizzle-orm';

// Test input for deletion
const testDeleteInput: DeleteItemInput = {
  id: 1
};

// Test input for creating a project to delete
const testCreateInput: CreateProjectInput = {
  title: 'Test Project',
  description: 'A project for testing deletion',
  technologies: ['JavaScript', 'React'],
  repository_url: 'https://github.com/test/project',
  demo_url: 'https://demo.example.com',
  video_url: null,
  featured: false,
  display_order: 0
};

describe('deleteProject', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should delete a project successfully', async () => {
    // First create a project to delete
    const created = await db.insert(projectsTable)
      .values({
        title: testCreateInput.title,
        description: testCreateInput.description,
        technologies: testCreateInput.technologies,
        repository_url: testCreateInput.repository_url,
        demo_url: testCreateInput.demo_url,
        video_url: testCreateInput.video_url,
        featured: testCreateInput.featured,
        display_order: testCreateInput.display_order
      })
      .returning()
      .execute();

    const projectId = created[0].id;

    // Delete the project
    const result = await deleteProject({ id: projectId });

    // Verify success response
    expect(result.success).toBe(true);

    // Verify project is actually deleted from database
    const projects = await db.select()
      .from(projectsTable)
      .where(eq(projectsTable.id, projectId))
      .execute();

    expect(projects).toHaveLength(0);
  });

  it('should return success even for non-existent project', async () => {
    // Try to delete a project that doesn't exist
    const result = await deleteProject({ id: 999 });

    // Should still return success (idempotent operation)
    expect(result.success).toBe(true);
  });

  it('should not affect other projects when deleting', async () => {
    // Create two projects
    const project1 = await db.insert(projectsTable)
      .values({
        title: 'Project 1',
        description: 'First project',
        technologies: ['JavaScript'],
        repository_url: 'https://github.com/test/project1',
        demo_url: null,
        video_url: null,
        featured: false,
        display_order: 1
      })
      .returning()
      .execute();

    const project2 = await db.insert(projectsTable)
      .values({
        title: 'Project 2',
        description: 'Second project',
        technologies: ['TypeScript'],
        repository_url: 'https://github.com/test/project2',
        demo_url: null,
        video_url: null,
        featured: false,
        display_order: 2
      })
      .returning()
      .execute();

    // Delete only the first project
    const result = await deleteProject({ id: project1[0].id });

    expect(result.success).toBe(true);

    // Verify first project is deleted
    const deletedProject = await db.select()
      .from(projectsTable)
      .where(eq(projectsTable.id, project1[0].id))
      .execute();

    expect(deletedProject).toHaveLength(0);

    // Verify second project still exists
    const remainingProject = await db.select()
      .from(projectsTable)
      .where(eq(projectsTable.id, project2[0].id))
      .execute();

    expect(remainingProject).toHaveLength(1);
    expect(remainingProject[0].title).toEqual('Project 2');
  });
});
