// Services (public SDK API)
export { AlbumService } from './modules/albums/services'
export { ArtistService } from './modules/artists/services'
export { PlaylistService } from './modules/playlists/services'
export { SearchService } from './modules/search/services'
export { SongService } from './modules/songs/services'

// Errors
export { SaavnError } from './common/errors'

// Models (Zod schemas for type inference)
export { AlbumModel, AlbumAPIResponseModel } from './modules/albums/models'
export { ArtistModel, ArtistAPIResponseModel, ArtistMapModel, ArtistMapAPIResponseModel } from './modules/artists/models'
export { SongModel, SongAPIResponseModel } from './modules/songs/models'
export type { DownloadLink } from './common/types'
