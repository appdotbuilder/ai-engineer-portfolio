
import { db } from '../db';
import { projectsTable } from '../db/schema';
import { type CreateProjectInput, type Project } from '../schema';

export const createProject = async (input: CreateProjectInput): Promise<Project> => {
  try {
    // Insert project record
    const result = await db.insert(projectsTable)
      .values({
        title: input.title,
        description: input.description,
        technologies: input.technologies,
        repository_url: input.repository_url,
        demo_url: input.demo_url,
        video_url: input.video_url,
        featured: input.featured,
        display_order: input.display_order
      })
      .returning()
      .execute();

    const project = result[0];
    return project;
  } catch (error) {
    console.error('Project creation failed:', error);
    throw error;
  }
};
