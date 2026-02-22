import type { z } from 'zod';
import type { FeaturedPlaylistAPIResponseModel, FeaturedPlaylistModel } from '#modules/discover/models';

export const createFeaturedPlaylistPayload = (
  playlist: z.infer<typeof FeaturedPlaylistAPIResponseModel>
): z.infer<typeof FeaturedPlaylistModel> => ({
  id: playlist.id,
  name: playlist.title,
  subtitle: playlist.subtitle,
  type: playlist.type,
  image: playlist.image,
  url: playlist.perma_url,
  songCount: playlist.more_info?.song_count ? Number(playlist.more_info.song_count) : null,
  followerCount: playlist.more_info?.follower_count ? Number(playlist.more_info.follower_count) : null,
  lastUpdated: playlist.more_info?.last_updated ?? null,
  explicitContent: playlist.explicit_content === '1',
});
