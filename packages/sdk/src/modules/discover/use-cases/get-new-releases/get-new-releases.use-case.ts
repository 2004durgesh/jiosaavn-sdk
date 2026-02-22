import { Endpoints } from '#common/constants';
import { useFetch } from '#common/helpers';
import type { IUseCase } from '#common/types';
import type { NewReleaseAPIResponseModel, NewReleaseModel } from '#modules/discover/models';
import type { z } from 'zod';

export interface GetNewReleasesArgs {
  page?: number;
  limit?: number;
}

export class GetNewReleasesUseCase implements IUseCase<GetNewReleasesArgs, z.infer<typeof NewReleaseModel>[]> {
  constructor() {}

  async execute({ page = 1, limit = 50 }: GetNewReleasesArgs = {}) {
    const { data } = await useFetch<{
      data: z.infer<typeof NewReleaseAPIResponseModel>[];
      count: number;
      last_page: boolean;
    }>({
      endpoint: Endpoints.discover.newReleases,
      params: {
        p: page,
        n: limit,
      },
    });

    return data.data.map((item) => ({
      id: item.id,
      name: item.title,
      subtitle: item.subtitle || '',
      type: item.type,
      url: item.perma_url,
      image: item.image,
      language: item.language,
      year: item.year || null,
      playCount: item.play_count ? Number(item.play_count) : null,
      explicitContent: item.explicit_content === '1',
    }));
  }
}
