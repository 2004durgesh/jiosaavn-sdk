import { z } from 'zod';

export const TopArtistAPIResponseModel = z.object({
  artistid: z.string(),
  name: z.string(),
  image: z.string(),
  follower_count: z.number(),
  is_followed: z.boolean(),
  perma_url: z.string(),
});

export const TopArtistModel = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  followerCount: z.number(),
  isFollowed: z.boolean(),
  url: z.string(),
});
