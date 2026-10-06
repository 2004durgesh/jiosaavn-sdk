import { Endpoints } from '#common/constants';
import { useFetch } from '#common/helpers';
import { createSongLyricsPayload } from '#modules/songs/helpers';
import { SaavnError } from '#common/errors';
import type { IUseCase } from '#common/types';
import type { SongLyricsAPIResponseModel, SongLyricsModel } from '#modules/songs/models';
import type { z } from 'zod';

export class GetSongLyricsUseCase implements IUseCase<string, z.infer<typeof SongLyricsModel>> {
  constructor() {}

  // Takes the song id: `lyrics_id` on song details is usually empty, and the endpoint accepts the
  // song id in its place (`SongModel.lyricsId` falls back to it).
  async execute(songId: string) {
    const { data } = await useFetch<z.infer<typeof SongLyricsAPIResponseModel>>({
      endpoint: Endpoints.songs.lyrics,
      params: {
        lyrics_id: songId,
      },
    });

    if (!data?.lyrics) throw new SaavnError(404, 'lyrics not found');

    return createSongLyricsPayload(data);
  }
}
