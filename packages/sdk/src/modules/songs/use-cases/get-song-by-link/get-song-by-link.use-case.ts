import { Endpoints } from '#common/constants'
import { useFetch } from '#common/helpers'
import { createSongPayload } from '#modules/songs/helpers'
import { SaavnError } from '#common/errors'
import type { IUseCase } from '#common/types'
import type { SongAPIResponseModel, SongModel } from '#modules/songs/models'
import type { z } from 'zod'

export class GetSongByLinkUseCase implements IUseCase<string, z.infer<typeof SongModel>[]> {
  constructor() {}

  async execute(token: string) {
    const { data } = await useFetch<{ songs: z.infer<typeof SongAPIResponseModel>[] }>({
      endpoint: Endpoints.songs.link,
      params: { token, type: 'song' }
    })

    if (!data.songs?.length) throw new SaavnError(404, 'song not found')

    return data.songs.map((song) => createSongPayload(song))
  }
}
