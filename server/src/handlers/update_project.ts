
import { db } from '../db';
import { projectsTable } from '../db/schema';
import { type UpdateProjectInput, type Project } from '../schema';
import { eq } from 'drizzle-orm';

export const updateProject = async (input: UpdateProjectInput): Promise<Project> => {
  try {
    // Build update object with only provided fields
    const updateData: any = {
      updated_at: new Date()
    };

    if (input.title !== undefined) updateData['title'] = input.title;
    if (input.description !== undefined) updateData['description'] = input.description;
    if (input.technologies !== undefined) updateData['technologies'] = input.technologies;
    if (input.repository_url !== undefined) updateData['repository_url'] = input.repository_url;
    if (input.demo_url !== undefined) updateData['demo_url'] = input.demo_url;
    if (input.video_url !== undefined) updateData['video_url'] = input.video_url;
    if (input.featured !== undefined) updateData['featured'] = input.featured;
    if (input.display_order !== undefined) updateData['display_order'] = input.display_order;

    // Update the project record
    const result = await db.update(projectsTable)
      .set(updateData)
      .where(eq(projectsTable.id, input.id))
      .returning()
      .execute();

    if (result.length === 0) {
      throw new Error(`Project with id ${input.id} not found`);
    }

    return result[0];
  } catch (error) {
    console.error('Project update failed:', error);
    throw error;
  }
};
