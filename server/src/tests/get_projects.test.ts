
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { projectsTable } from '../db/schema';
import { type CreateProjectInput } from '../schema';
import { getProjects } from '../handlers/get_projects';

// Test project inputs
const featuredProject: CreateProjectInput = {
  title: 'Featured Project',
  description: 'A featured project for testing',
  technologies: ['React', 'TypeScript'],
  repository_url: 'https://github.com/user/featured-project',
  demo_url: 'https://featured-demo.com',
  video_url: 'https://video.com/featured',
  featured: true,
  display_order: 2
};

const regularProject1: CreateProjectInput = {
  title: 'Regular Project 1',
  description: 'First regular project',
  technologies: ['Vue', 'JavaScript'],
  repository_url: 'https://github.com/user/regular-1',
  demo_url: null,
  video_url: null,
  featured: false,
  display_order: 1
};

const regularProject2: CreateProjectInput = {
  title: 'Regular Project 2',
  description: 'Second regular project',
  technologies: ['Angular', 'TypeScript'],
  repository_url: 'https://github.com/user/regular-2',
  demo_url: 'https://regular2-demo.com',
  video_url: null,
  featured: false,
  display_order: 3
};

describe('getProjects', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return empty array when no projects exist', async () => {
    const result = await getProjects();
    expect(result).toEqual([]);
  });

  it('should return all projects with correct structure', async () => {
    // Create test projects
    await db.insert(projectsTable)
      .values([
        {
          title: regularProject1.title,
          description: regularProject1.description,
          technologies: regularProject1.technologies,
          repository_url: regularProject1.repository_url,
          demo_url: regularProject1.demo_url,
          video_url: regularProject1.video_url,
          featured: regularProject1.featured,
          display_order: regularProject1.display_order
        }
      ])
      .execute();

    const result = await getProjects();

    expect(result).toHaveLength(1);
    expect(result[0].title).toEqual('Regular Project 1');
    expect(result[0].description).toEqual(regularProject1.description);
    expect(result[0].technologies).toEqual(['Vue', 'JavaScript']);
    expect(result[0].repository_url).toEqual(regularProject1.repository_url);
    expect(result[0].demo_url).toBeNull();
    expect(result[0].video_url).toBeNull();
    expect(result[0].featured).toBe(false);
    expect(result[0].display_order).toEqual(1);
    expect(result[0].id).toBeDefined();
    expect(result[0].created_at).toBeInstanceOf(Date);
    expect(result[0].updated_at).toBeInstanceOf(Date);
  });

  it('should order projects with featured first, then by display_order and created_at', async () => {
    // Insert projects in different order than expected result
    await db.insert(projectsTable)
      .values([
        {
          title: regularProject2.title,
          description: regularProject2.description,
          technologies: regularProject2.technologies,
          repository_url: regularProject2.repository_url,
          demo_url: regularProject2.demo_url,
          video_url: regularProject2.video_url,
          featured: regularProject2.featured,
          display_order: regularProject2.display_order
        },
        {
          title: featuredProject.title,
          description: featuredProject.description,
          technologies: featuredProject.technologies,
          repository_url: featuredProject.repository_url,
          demo_url: featuredProject.demo_url,
          video_url: featuredProject.video_url,
          featured: featuredProject.featured,
          display_order: featuredProject.display_order
        },
        {
          title: regularProject1.title,
          description: regularProject1.description,
          technologies: regularProject1.technologies,
          repository_url: regularProject1.repository_url,
          demo_url: regularProject1.demo_url,
          video_url: regularProject1.video_url,
          featured: regularProject1.featured,
          display_order: regularProject1.display_order
        }
      ])
      .execute();

    const result = await getProjects();

    expect(result).toHaveLength(3);
    
    // Featured project should be first
    expect(result[0].title).toEqual('Featured Project');
    expect(result[0].featured).toBe(true);
    
    // Regular projects should follow, ordered by display_order
    expect(result[1].title).toEqual('Regular Project 1');
    expect(result[1].featured).toBe(false);
    expect(result[1].display_order).toEqual(1);
    
    expect(result[2].title).toEqual('Regular Project 2');
    expect(result[2].featured).toBe(false);
    expect(result[2].display_order).toEqual(3);
  });

  it('should handle projects with complex technology arrays', async () => {
    const complexProject = {
      title: 'Complex Project',
      description: 'Project with many technologies',
      technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
      repository_url: 'https://github.com/user/complex',
      demo_url: null,
      video_url: null,
      featured: false,
      display_order: 0
    };

    await db.insert(projectsTable)
      .values([complexProject])
      .execute();

    const result = await getProjects();

    expect(result).toHaveLength(1);
    expect(result[0].technologies).toEqual(['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker']);
    expect(Array.isArray(result[0].technologies)).toBe(true);
  });
});
