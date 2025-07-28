
import { serial, text, pgTable, timestamp, integer, boolean, jsonb } from 'drizzle-orm/pg-core';

export const projectsTable = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  technologies: jsonb('technologies').notNull().$type<string[]>(),
  repository_url: text('repository_url').notNull(),
  demo_url: text('demo_url'),
  video_url: text('video_url'),
  featured: boolean('featured').notNull().default(false),
  display_order: integer('display_order').notNull().default(0),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const experienceTable = pgTable('experience', {
  id: serial('id').primaryKey(),
  company: text('company').notNull(),
  position: text('position').notNull(),
  description: text('description').notNull(),
  start_date: timestamp('start_date').notNull(),
  end_date: timestamp('end_date'),
  location: text('location'),
  technologies: jsonb('technologies').notNull().$type<string[]>(),
  display_order: integer('display_order').notNull().default(0),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const skillsTable = pgTable('skills', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  proficiency_level: integer('proficiency_level').notNull(),
  display_order: integer('display_order').notNull().default(0),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const aboutMeTable = pgTable('about_me', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  profile_image_url: text('profile_image_url'),
  resume_url: text('resume_url'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const contactInfoTable = pgTable('contact_info', {
  id: serial('id').primaryKey(),
  email: text('email').notNull(),
  phone: text('phone'),
  linkedin_url: text('linkedin_url'),
  github_url: text('github_url'),
  twitter_url: text('twitter_url'),
  location: text('location'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// TypeScript types for the table schemas
export type Project = typeof projectsTable.$inferSelect;
export type NewProject = typeof projectsTable.$inferInsert;
export type Experience = typeof experienceTable.$inferSelect;
export type NewExperience = typeof experienceTable.$inferInsert;
export type Skill = typeof skillsTable.$inferSelect;
export type NewSkill = typeof skillsTable.$inferInsert;
export type AboutMe = typeof aboutMeTable.$inferSelect;
export type NewAboutMe = typeof aboutMeTable.$inferInsert;
export type ContactInfo = typeof contactInfoTable.$inferSelect;
export type NewContactInfo = typeof contactInfoTable.$inferInsert;

// Export all tables for proper query building
export const tables = {
  projects: projectsTable,
  experience: experienceTable,
  skills: skillsTable,
  aboutMe: aboutMeTable,
  contactInfo: contactInfoTable
};
