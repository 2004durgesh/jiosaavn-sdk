import { z } from 'zod';

export const FeaturedPlaylistAPIResponseModel = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  type: z.string(),
  image: z.string(),
  perma_url: z.string(),
  more_info: z.object({
    song_count: z.string().optional(),
    firstname: z.string().optional(),
    follower_count: z.string().optional(),
    last_updated: z.string().optional(),
    uid: z.string().optional(),
  }),
  explicit_content: z.string(),
  mini_obj: z.boolean().optional(),
});

export const FeaturedPlaylistModel = z.object({
  id: z.string(),
  name: z.string(),
  subtitle: z.string(),
  type: z.string(),
  image: z.string(),
  url: z.string(),
  songCount: z.number().nullable(),
  followerCount: z.number().nullable(),
  lastUpdated: z.string().nullable(),
  explicitContent: z.boolean(),
});
