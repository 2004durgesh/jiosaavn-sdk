import { createImageLinks, decodeEntities, parseJsonField } from '#common/helpers';
import { createAlbumPayload } from '#modules/albums/helpers';
import { createSongPayload } from '#modules/songs/helpers';
import type {
  ArtistAPIResponseModel,
  ArtistMapAPIResponseModel,
  ArtistMapModel,
  ArtistModel,
} from '#modules/artists/models';
import type { z } from 'zod';

type ArtistBio = z.infer<typeof ArtistModel>['bio'];

// The bio is usually a JSON array of sections, but some artists have plain text instead.
const parseBio = (bio: string): ArtistBio =>
  parseJsonField<ArtistBio>(bio, [{ text: decodeEntities(bio), title: null, sequence: null }]);

export const createArtistPayload = (artist: z.infer<typeof ArtistAPIResponseModel>): z.infer<typeof ArtistModel> => ({
  id: artist.artistId || artist.id,
  name: artist.name,
  url: artist.urls?.overview || artist.perma_url,
  type: artist.type,
  followerCount: artist.follower_count ? Number(artist.follower_count) : null,
  fanCount: artist.fan_count || null,
  isVerified: artist.isVerified || null,
  dominantLanguage: artist.dominantLanguage || null,
  dominantType: artist.dominantType || null,
  bio: artist.bio ? parseBio(artist.bio) : null,
  dob: artist.dob || null,
  fb: artist.fb || null,
  twitter: artist.twitter || null,
  wiki: artist.wiki || null,
  availableLanguages: artist.availableLanguages || null,
  isRadioPresent: artist.isRadioPresent || null,
  image: createImageLinks(artist.image),
  topSongs: artist.topSongs?.map(createSongPayload) || null,
  topAlbums: artist.topAlbums?.map(createAlbumPayload) || null,
  singles: artist.singles?.map(createSongPayload) || null,
  similarArtists:
    artist.similarArtists?.map((similarArtist) => ({
      id: similarArtist.id,
      name: similarArtist.name,
      url: similarArtist.perma_url,
      image: createImageLinks(similarArtist.image_url),
      languages: similarArtist.languages ? parseJsonField(similarArtist.languages, null) : null,
      wiki: similarArtist.wiki,
      dob: similarArtist.dob,
      fb: similarArtist.fb,
      twitter: similarArtist.twitter,
      isRadioPresent: similarArtist.isRadioPresent,
      type: similarArtist.type,
      dominantType: similarArtist.dominantType,
      aka: similarArtist.aka,
      // Plain text (not JSON like the artist's own bio), as SimilarArtist.bio is typed.
      bio: similarArtist.bio ? decodeEntities(similarArtist.bio) : null,
      similarArtists: similarArtist.similar ? parseJsonField(similarArtist.similar, null) : null,
    })) || null,
});

export const createArtistMapPayload = (
  artist: z.infer<typeof ArtistMapAPIResponseModel>
): z.infer<typeof ArtistMapModel> => ({
  id: artist.id,
  name: artist.name,
  role: artist.role,
  image: createImageLinks(artist.image),
  type: artist.type,
  url: artist.perma_url,
});
