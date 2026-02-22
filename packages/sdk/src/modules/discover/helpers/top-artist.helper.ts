import type { z } from 'zod';
import type { TopArtistAPIResponseModel, TopArtistModel } from '#modules/discover/models';

export const createTopArtistPayload = (
  artist: z.infer<typeof TopArtistAPIResponseModel>
): z.infer<typeof TopArtistModel> => ({
  id: artist.artistid,
  name: artist.name,
  image: artist.image,
  followerCount: artist.follower_count,
  isFollowed: artist.is_followed,
  url: artist.perma_url,
});
