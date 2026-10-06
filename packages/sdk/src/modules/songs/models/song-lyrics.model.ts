import { z } from 'zod';

export const SongLyricsAPIResponseModel = z.object({
  lyrics: z.string(),
  lyrics_copyright: z.string(),
  snippet: z.string(),
  script_tracking_url: z.string(),
});

export const SongLyricsModel = z.object({
  lyrics: z.string(),
  copyright: z.string().nullable(),
  snippet: z.string().nullable(),
});
