
import { db } from '../db';
import { projectsTable } from '../db/schema';
import { type Project } from '../schema';
import { desc, asc } from 'drizzle-orm';

export const getProjects = async (): Promise<Project[]> => {
  try {
    const results = await db.select()
      .from(projectsTable)
      .orderBy(desc(projectsTable.featured), asc(projectsTable.display_order), asc(projectsTable.created_at))
      .execute();

    return results.map(project => ({
      ...project,
      technologies: project.technologies as string[] // Ensure proper type for jsonb field
    }));
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    throw error;
  }
};
