import { Endpoints } from '#common/constants';
import { useFetch } from '#common/helpers';
import { createAlbumPayload } from '#modules/albums/helpers';
import { SaavnError } from '#common/errors';
import type { IUseCase } from '#common/types';
import type { AlbumAPIResponseModel, AlbumModel } from '#modules/albums/models';
import type { z } from 'zod';

export class GetAlbumByIdUseCase implements IUseCase<string, z.infer<typeof AlbumModel>> {
  constructor() {}

  async execute(id: string) {
    const { data } = await useFetch<z.infer<typeof AlbumAPIResponseModel>>({
      endpoint: Endpoints.albums.id,
      params: { albumid: id },
    });

    if (!data) throw new SaavnError(404, 'album not found');

    return createAlbumPayload(data);
  }
}
