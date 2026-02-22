import { Endpoints } from '#common/constants';
import { useFetch } from '#common/helpers';
import { createFeaturedPlaylistPayload } from '#modules/discover/helpers';
import type { IUseCase } from '#common/types';
import type { FeaturedPlaylistAPIResponseModel, FeaturedPlaylistModel } from '#modules/discover/models';
import type { z } from 'zod';

export interface GetFeaturedPlaylistsArgs {
  page?: number;
  limit?: number;
}

export class GetFeaturedPlaylistsUseCase implements IUseCase<
  GetFeaturedPlaylistsArgs,
  z.infer<typeof FeaturedPlaylistModel>[]
> {
  constructor() {}

  async execute({ page = 1, limit = 50 }: GetFeaturedPlaylistsArgs = {}) {
    const { data } = await useFetch<{
      data: z.infer<typeof FeaturedPlaylistAPIResponseModel>[];
      count: number;
      last_page: boolean;
    }>({
      endpoint: Endpoints.discover.featuredPlaylists,
      params: {
        p: page,
        n: limit,
        fetch_from_serialized_files: 'true',
      },
    });

    return data.data.map((playlist) => createFeaturedPlaylistPayload(playlist));
  }
}
