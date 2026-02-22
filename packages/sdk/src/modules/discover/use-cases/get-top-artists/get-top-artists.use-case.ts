import { Endpoints } from '#common/constants';
import { useFetch } from '#common/helpers';
import { createTopArtistPayload } from '#modules/discover/helpers';
import type { IUseCase } from '#common/types';
import type { TopArtistAPIResponseModel, TopArtistModel } from '#modules/discover/models';
import type { z } from 'zod';

export class GetTopArtistsUseCase {
  constructor() {}

  async execute() {
    const { data } = await useFetch<{ top_artists: z.infer<typeof TopArtistAPIResponseModel>[] }>({
      endpoint: Endpoints.discover.topArtists,
      params: {},
    });

    return data.top_artists.map((artist) => createTopArtistPayload(artist));
  }
}
