
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { projectsTable } from '../db/schema';
import { type CreateProjectInput } from '../schema';
import { createProject } from '../handlers/create_project';
import { eq } from 'drizzle-orm';

// Test input with all required fields
const testInput: CreateProjectInput = {
  title: 'Test Project',
  description: 'A comprehensive testing project',
  technologies: ['JavaScript', 'TypeScript', 'React'],
  repository_url: 'https://github.com/user/test-project',
  demo_url: 'https://test-project.com',
  video_url: 'https://youtube.com/watch?v=test',
  featured: true,
  display_order: 5
};

describe('createProject', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should create a project with all fields', async () => {
    const result = await createProject(testInput);

    // Basic field validation
    expect(result.title).toEqual('Test Project');
    expect(result.description).toEqual('A comprehensive testing project');
    expect(result.technologies).toEqual(['JavaScript', 'TypeScript', 'React']);
    expect(result.repository_url).toEqual('https://github.com/user/test-project');
    expect(result.demo_url).toEqual('https://test-project.com');
    expect(result.video_url).toEqual('https://youtube.com/watch?v=test');
    expect(result.featured).toEqual(true);
    expect(result.display_order).toEqual(5);
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
    expect(result.updated_at).toBeInstanceOf(Date);
  });

  it('should create a project with defaults and nullable fields', async () => {
    const minimalInput: CreateProjectInput = {
      title: 'Minimal Project',
      description: 'Basic project description',
      technologies: ['Node.js'],
      repository_url: 'https://github.com/user/minimal-project',
      demo_url: null,
      video_url: null,
      featured: false,
      display_order: 0
    };

    const result = await createProject(minimalInput);

    expect(result.title).toEqual('Minimal Project');
    expect(result.demo_url).toBeNull();
    expect(result.video_url).toBeNull();
    expect(result.featured).toEqual(false);
    expect(result.display_order).toEqual(0);
  });

  it('should save project to database', async () => {
    const result = await createProject(testInput);

    // Query database to verify persistence
    const projects = await db.select()
      .from(projectsTable)
      .where(eq(projectsTable.id, result.id))
      .execute();

    expect(projects).toHaveLength(1);
    const savedProject = projects[0];
    
    expect(savedProject.title).toEqual('Test Project');
    expect(savedProject.description).toEqual('A comprehensive testing project');
    expect(savedProject.technologies).toEqual(['JavaScript', 'TypeScript', 'React']);
    expect(savedProject.repository_url).toEqual('https://github.com/user/test-project');
    expect(savedProject.demo_url).toEqual('https://test-project.com');
    expect(savedProject.video_url).toEqual('https://youtube.com/watch?v=test');
    expect(savedProject.featured).toEqual(true);
    expect(savedProject.display_order).toEqual(5);
    expect(savedProject.created_at).toBeInstanceOf(Date);
    expect(savedProject.updated_at).toBeInstanceOf(Date);
  });

  it('should handle technologies array correctly', async () => {
    const techInput: CreateProjectInput = {
      title: 'Tech Stack Project',
      description: 'Project demonstrating technology handling',
      technologies: ['Python', 'Django', 'PostgreSQL', 'Docker', 'AWS'],
      repository_url: 'https://github.com/user/tech-project',
      demo_url: null,
      video_url: null,
      featured: false,
      display_order: 0
    };

    const result = await createProject(techInput);

    expect(result.technologies).toEqual(['Python', 'Django', 'PostgreSQL', 'Docker', 'AWS']);
    expect(Array.isArray(result.technologies)).toBe(true);
    expect(result.technologies).toHaveLength(5);
  });

  it('should set timestamps automatically', async () => {
    const beforeCreate = new Date();
    const result = await createProject(testInput);
    const afterCreate = new Date();

    expect(result.created_at).toBeInstanceOf(Date);
    expect(result.updated_at).toBeInstanceOf(Date);
    expect(result.created_at.getTime()).toBeGreaterThanOrEqual(beforeCreate.getTime());
    expect(result.created_at.getTime()).toBeLessThanOrEqual(afterCreate.getTime());
    expect(result.updated_at.getTime()).toBeGreaterThanOrEqual(beforeCreate.getTime());
    expect(result.updated_at.getTime()).toBeLessThanOrEqual(afterCreate.getTime());
  });
});
