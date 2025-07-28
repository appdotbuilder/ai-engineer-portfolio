
import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';

// Import schema types
import {
  createProjectInputSchema,
  updateProjectInputSchema,
  deleteItemInputSchema,
  createExperienceInputSchema,
  createSkillInputSchema,
  updateAboutMeInputSchema,
  updateContactInfoInputSchema
} from './schema';

// Import handlers
import { getProjects } from './handlers/get_projects';
import { createProject } from './handlers/create_project';
import { updateProject } from './handlers/update_project';
import { deleteProject } from './handlers/delete_project';
import { getExperience } from './handlers/get_experience';
import { createExperience } from './handlers/create_experience';
import { getSkills } from './handlers/get_skills';
import { createSkill } from './handlers/create_skill';
import { getAboutMe } from './handlers/get_about_me';
import { updateAboutMe } from './handlers/update_about_me';
import { getContactInfo } from './handlers/get_contact_info';
import { updateContactInfo } from './handlers/update_contact_info';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),

  // Project routes
  getProjects: publicProcedure
    .query(() => getProjects()),
  
  createProject: publicProcedure
    .input(createProjectInputSchema)
    .mutation(({ input }) => createProject(input)),
  
  updateProject: publicProcedure
    .input(updateProjectInputSchema)
    .mutation(({ input }) => updateProject(input)),
  
  deleteProject: publicProcedure
    .input(deleteItemInputSchema)
    .mutation(({ input }) => deleteProject(input)),

  // Experience routes
  getExperience: publicProcedure
    .query(() => getExperience()),
  
  createExperience: publicProcedure
    .input(createExperienceInputSchema)
    .mutation(({ input }) => createExperience(input)),

  // Skills routes
  getSkills: publicProcedure
    .query(() => getSkills()),
  
  createSkill: publicProcedure
    .input(createSkillInputSchema)
    .mutation(({ input }) => createSkill(input)),

  // About Me routes
  getAboutMe: publicProcedure
    .query(() => getAboutMe()),
  
  updateAboutMe: publicProcedure
    .input(updateAboutMeInputSchema)
    .mutation(({ input }) => updateAboutMe(input)),

  // Contact Info routes
  getContactInfo: publicProcedure
    .query(() => getContactInfo()),
  
  updateContactInfo: publicProcedure
    .input(updateContactInfoInputSchema)
    .mutation(({ input }) => updateContactInfo(input)),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`TRPC server listening at port: ${port}`);
}

start();
