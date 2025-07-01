import { z } from 'zod';

export const PostSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }).max(255, { message: 'Title must not exceed 255 characters' }),
  content: z.string().min(1, { message: 'Content is required' }),
});

export type PostFormData = z.infer<typeof PostSchema>;