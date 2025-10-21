import { z } from 'zod';

// Enums
export const planStatusSchema = z.enum(['DRAFT', 'ACTIVE', 'ARCHIVED']);

// Base models (for IO shapes)
export const userSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  email: z.string().email().nullish(),
  image: z.string().url().nullish(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const projectSchema = z.object({
  id: z.string(),
  ownerId: z.string(),
  name: z.string().min(1),
  slug: z.string().min(1).optional(),
  description: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const planSectionSchema = z.object({
  id: z.string(),
  planId: z.string(),
  title: z.string().min(1),
  content: z.string(),
  order: z.number().int().min(0).default(0),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const planSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  title: z.string().min(1),
  status: planStatusSchema.default('DRAFT'),
  sections: z.array(planSectionSchema).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const templateSchema = z.object({
  id: z.string(),
  slug: z.string().min(1),
  name: z.string().min(1),
  content: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Input/Output schemas for API IO
export const createProjectInput = projectSchema.pick({ name: true, slug: true, description: true });
export const updateProjectInput = projectSchema.pick({ slug: true, description: true, name: true }).partial().extend({ id: z.string() });

export const createPlanSectionInput = planSectionSchema.pick({ title: true, content: true, order: true });
export const updatePlanSectionInput = planSectionSchema.pick({ title: true, content: true, order: true }).partial().extend({ id: z.string() });

export const createPlanInput = z.object({
  projectId: z.string(),
  title: z.string().min(1),
  status: planStatusSchema.optional(),
  sections: z.array(createPlanSectionInput).optional(),
});

export const updatePlanInput = z.object({
  id: z.string(),
  title: z.string().min(1).optional(),
  status: planStatusSchema.optional(),
  sections: z.array(updatePlanSectionInput).optional(),
});

export const upsertTemplateInput = templateSchema.pick({ slug: true, name: true, content: true });

// Types
export type PlanStatus = z.infer<typeof planStatusSchema>;
export type UserIO = z.infer<typeof userSchema>;
export type ProjectIO = z.infer<typeof projectSchema>;
export type PlanIO = z.infer<typeof planSchema>;
export type PlanSectionIO = z.infer<typeof planSectionSchema>;
export type TemplateIO = z.infer<typeof templateSchema>;
export type CreateProjectInput = z.infer<typeof createProjectInput>;
export type UpdateProjectInput = z.infer<typeof updateProjectInput>;
export type CreatePlanInput = z.infer<typeof createPlanInput>;
export type UpdatePlanInput = z.infer<typeof updatePlanInput>;
export type CreatePlanSectionInput = z.infer<typeof createPlanSectionInput>;
export type UpdatePlanSectionInput = z.infer<typeof updatePlanSectionInput>;
export type UpsertTemplateInput = z.infer<typeof upsertTemplateInput>;
