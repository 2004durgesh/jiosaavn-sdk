import { TopArtistModel } from '#modules/discover/models';
import { GetTopArtistsUseCase } from '#modules/discover/use-cases';
import { beforeAll, describe, expect, it } from 'vitest';

describe('GetTopArtists', () => {
  let useCase: GetTopArtistsUseCase;

  beforeAll(() => {
    useCase = new GetTopArtistsUseCase();
  });

  it('should return a list of top artists', async () => {
    const artists = await useCase.execute();

    expect(artists.length).toBeGreaterThan(0);
    expect(() => TopArtistModel.parse(artists[0])).not.toThrow();
  });

  it('should have correct fields for each artist', async () => {
    const artists = await useCase.execute();
    const artist = artists[0]!;

    expect(artist.id).toBeDefined();
    expect(artist.name).toBeDefined();
    expect(typeof artist.followerCount).toBe('number');
  });
});
