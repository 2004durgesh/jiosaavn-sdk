import { z } from 'zod';

export const ChartAPIResponseModel = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  type: z.string(),
  image: z.string(),
  perma_url: z.string(),
  more_info: z
    .object({
      firstname: z.string().optional(),
    })
    .optional(),
  explicit_content: z.string().optional(),
  mini_obj: z.boolean().optional(),
  language: z.string().optional(),
  count: z.number().optional(),
});

export const ChartModel = z.object({
  id: z.string(),
  name: z.string(),
  subtitle: z.string().nullable(),
  type: z.string(),
  image: z.string(),
  url: z.string(),
  language: z.string().nullable(),
  songCount: z.number().nullable(),
  explicitContent: z.boolean(),
});
