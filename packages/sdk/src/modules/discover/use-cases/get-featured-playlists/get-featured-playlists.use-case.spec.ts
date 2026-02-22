import { FeaturedPlaylistModel } from '#modules/discover/models';
import { GetFeaturedPlaylistsUseCase } from '#modules/discover/use-cases';
import { beforeAll, describe, expect, it } from 'vitest';

describe('GetFeaturedPlaylists', () => {
  let useCase: GetFeaturedPlaylistsUseCase;

  beforeAll(() => {
    useCase = new GetFeaturedPlaylistsUseCase();
  });

  it('should return a list of featured playlists', async () => {
    const playlists = await useCase.execute();

    expect(playlists.length).toBeGreaterThan(0);
    expect(() => FeaturedPlaylistModel.parse(playlists[0])).not.toThrow();
  });

  it('should respect the limit parameter', async () => {
    const playlists = await useCase.execute({ limit: 5 });

    expect(playlists.length).toBeLessThanOrEqual(5);
  });
});
