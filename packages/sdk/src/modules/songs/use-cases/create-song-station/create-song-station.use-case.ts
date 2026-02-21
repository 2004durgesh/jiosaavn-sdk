import { Endpoints } from '#common/constants'
import { ApiContextEnum } from '#common/enums'
import { useFetch } from '#common/helpers'
import { SaavnError } from '#common/errors'
import type { IUseCase } from '#common/types'

export class CreateSongStationUseCase implements IUseCase<string, string> {
  constructor() {}

  async execute(songId: string) {
    const encodedSongId = JSON.stringify([encodeURIComponent(songId)])

    const { data, ok } = await useFetch<{ stationid: string }>({
      endpoint: Endpoints.songs.station,
      params: {
        entity_id: encodedSongId,
        entity_type: 'queue'
      },
      context: ApiContextEnum.ANDROID
    })

    if (!data || !ok || !data.stationid) throw new SaavnError(500, 'could not create station')

    return data.stationid
  }
}
