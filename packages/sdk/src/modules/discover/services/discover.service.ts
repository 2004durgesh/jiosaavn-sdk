import {
  GetTopArtistsUseCase,
  GetFeaturedPlaylistsUseCase,
  GetNewReleasesUseCase,
  GetChartsUseCase,
  type GetFeaturedPlaylistsArgs,
  type GetNewReleasesArgs,
} from '../use-cases';

export class DiscoverService {
  private readonly getTopArtistsUseCase: GetTopArtistsUseCase;
  private readonly getFeaturedPlaylistsUseCase: GetFeaturedPlaylistsUseCase;
  private readonly getNewReleasesUseCase: GetNewReleasesUseCase;
  private readonly getChartsUseCase: GetChartsUseCase;

  constructor() {
    this.getTopArtistsUseCase = new GetTopArtistsUseCase();
    this.getFeaturedPlaylistsUseCase = new GetFeaturedPlaylistsUseCase();
    this.getNewReleasesUseCase = new GetNewReleasesUseCase();
    this.getChartsUseCase = new GetChartsUseCase();
  }

  getTopArtists = () => {
    return this.getTopArtistsUseCase.execute();
  };

  getFeaturedPlaylists = (args?: GetFeaturedPlaylistsArgs) => {
    return this.getFeaturedPlaylistsUseCase.execute(args);
  };

  getNewReleases = (args?: GetNewReleasesArgs) => {
    return this.getNewReleasesUseCase.execute(args);
  };

  getCharts = () => {
    return this.getChartsUseCase.execute();
  };
}
