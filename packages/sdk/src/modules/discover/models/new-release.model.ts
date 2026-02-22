import { z } from 'zod';

export const NewReleaseAPIResponseModel = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  type: z.string(),
  perma_url: z.string(),
  image: z.string(),
  language: z.string(),
  year: z.string(),
  play_count: z.string().optional(),
  explicit_content: z.string(),
});

export const NewReleaseModel = z.object({
  id: z.string(),
  name: z.string(),
  subtitle: z.string(),
  type: z.string(),
  url: z.string(),
  image: z.string(),
  language: z.string(),
  year: z.string().nullable(),
  playCount: z.number().nullable(),
  explicitContent: z.boolean(),
});
