
import { z } from 'zod';

// Project schema
export const projectSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  technologies: z.array(z.string()),
  repository_url: z.string(),
  demo_url: z.string().nullable(),
  video_url: z.string().nullable(),
  featured: z.boolean(),
  display_order: z.number().int(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Project = z.infer<typeof projectSchema>;

// Experience schema
export const experienceSchema = z.object({
  id: z.number(),
  company: z.string(),
  position: z.string(),
  description: z.string(),
  start_date: z.coerce.date(),
  end_date: z.coerce.date().nullable(),
  location: z.string().nullable(),
  technologies: z.array(z.string()),
  display_order: z.number().int(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Experience = z.infer<typeof experienceSchema>;

// Skill schema
export const skillSchema = z.object({
  id: z.number(),
  name: z.string(),
  category: z.string(),
  proficiency_level: z.number().int().min(1).max(5),
  display_order: z.number().int(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Skill = z.infer<typeof skillSchema>;

// About Me schema
export const aboutMeSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  profile_image_url: z.string().nullable(),
  resume_url: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type AboutMe = z.infer<typeof aboutMeSchema>;

// Contact Info schema
export const contactInfoSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  phone: z.string().nullable(),
  linkedin_url: z.string().nullable(),
  github_url: z.string().nullable(),
  twitter_url: z.string().nullable(),
  location: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type ContactInfo = z.infer<typeof contactInfoSchema>;

// Input schemas for creating
export const createProjectInputSchema = z.object({
  title: z.string(),
  description: z.string(),
  technologies: z.array(z.string()),
  repository_url: z.string().url(),
  demo_url: z.string().url().nullable(),
  video_url: z.string().url().nullable(),
  featured: z.boolean().default(false),
  display_order: z.number().int().nonnegative().default(0)
});

export type CreateProjectInput = z.infer<typeof createProjectInputSchema>;

export const createExperienceInputSchema = z.object({
  company: z.string(),
  position: z.string(),
  description: z.string(),
  start_date: z.coerce.date(),
  end_date: z.coerce.date().nullable(),
  location: z.string().nullable(),
  technologies: z.array(z.string()),
  display_order: z.number().int().nonnegative().default(0)
});

export type CreateExperienceInput = z.infer<typeof createExperienceInputSchema>;

export const createSkillInputSchema = z.object({
  name: z.string(),
  category: z.string(),
  proficiency_level: z.number().int().min(1).max(5),
  display_order: z.number().int().nonnegative().default(0)
});

export type CreateSkillInput = z.infer<typeof createSkillInputSchema>;

export const updateAboutMeInputSchema = z.object({
  title: z.string(),
  description: z.string(),
  profile_image_url: z.string().url().nullable(),
  resume_url: z.string().url().nullable()
});

export type UpdateAboutMeInput = z.infer<typeof updateAboutMeInputSchema>;

export const updateContactInfoInputSchema = z.object({
  email: z.string().email(),
  phone: z.string().nullable(),
  linkedin_url: z.string().url().nullable(),
  github_url: z.string().url().nullable(),
  twitter_url: z.string().url().nullable(),
  location: z.string().nullable()
});

export type UpdateContactInfoInput = z.infer<typeof updateContactInfoInputSchema>;

// Update schemas
export const updateProjectInputSchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  description: z.string().optional(),
  technologies: z.array(z.string()).optional(),
  repository_url: z.string().url().optional(),
  demo_url: z.string().url().nullable().optional(),
  video_url: z.string().url().nullable().optional(),
  featured: z.boolean().optional(),
  display_order: z.number().int().nonnegative().optional()
});

export type UpdateProjectInput = z.infer<typeof updateProjectInputSchema>;

// Delete schema
export const deleteItemInputSchema = z.object({
  id: z.number()
});

export type DeleteItemInput = z.infer<typeof deleteItemInputSchema>;
