import { SongLyricsModel } from '#modules/songs/models';
import { GetSongByIdUseCase, GetSongLyricsUseCase } from '#modules/songs/use-cases';
import { SaavnError } from '#common/errors';
import { beforeAll, describe, expect, it } from 'vitest';

describe('GetSongLyrics', () => {
  let getSongLyricsUseCase: GetSongLyricsUseCase;

  beforeAll(() => {
    getSongLyricsUseCase = new GetSongLyricsUseCase();
  });

  it('should return lyrics for a song as plain text', async () => {
    const lyrics = await getSongLyricsUseCase.execute('aRZbUYD7');

    expect(() => SongLyricsModel.parse(lyrics)).not.toThrow();
    expect(lyrics.lyrics).toContain('\n');
    expect(lyrics.lyrics).not.toMatch(/<br/i);
  });

  it('should fetch lyrics with the lyricsId from song details', async () => {
    const [song] = await new GetSongByIdUseCase().execute({ songIds: 'aRZbUYD7' });

    expect(song?.hasLyrics).toBe(true);
    await expect(getSongLyricsUseCase.execute(song!.lyricsId!)).resolves.toBeTruthy();
  });

  it('should throw 404 error when the song has no lyrics', async () => {
    await expect(getSongLyricsUseCase.execute('3IoDK8qI')).rejects.toThrow(SaavnError);
  });
});
