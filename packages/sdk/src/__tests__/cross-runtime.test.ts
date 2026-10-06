import { describe, expect, it } from 'vitest'
import { createDownloadLinks, createImageLinks } from '#common/helpers/link.helper'
import { SaavnError } from '#common/errors'
import { AlbumService } from '#modules/albums/services'
import { ArtistService } from '#modules/artists/services'
import { PlaylistService } from '#modules/playlists/services'
import { SearchService } from '#modules/search/services'
import { SongService } from '#modules/songs/services'

describe('Cross-Runtime Compatibility', () => {
  describe('Service Instantiation', () => {
    it('should instantiate all services without errors', () => {
      expect(() => new SongService()).not.toThrow()
      expect(() => new AlbumService()).not.toThrow()
      expect(() => new ArtistService()).not.toThrow()
      expect(() => new PlaylistService()).not.toThrow()
      expect(() => new SearchService()).not.toThrow()
    })
  })

  describe('Error Handling', () => {
    it('should create and throw SaavnError', () => {
      const error = new SaavnError(404, 'not found')
      expect(error).toBeInstanceOf(Error)
      expect(error).toBeInstanceOf(SaavnError)
      expect(error.statusCode).toBe(404)
      expect(error.message).toBe('not found')
      expect(error.name).toBe('SaavnError')
    })
  })

  describe('Crypto (built-in DES)', () => {
    it('should decrypt media URLs using DES-ECB in the current runtime', () => {
      // A real encrypted_media_url (Levitating); no Node/browser crypto APIs involved
      const links = createDownloadLinks(
        'ID2ieOjCrwfgWvL5sXl4B1ImC5QfbsDylsUbBKiBMWa4cKhEF4Xz5p975Hh3jSc+rXO0khV0lO1tzxLIEtHbjhw7tS9a8Gtq'
      )
      expect(links[2]).toEqual({
        quality: '96kbps',
        url: 'https://aac.saavncdn.com/665/7790c3b9097592113008eaf1031d6e57_96.mp4',
      })
      expect(createDownloadLinks('')).toEqual([])
    })

    it('should create image links from a base URL', () => {
      const links = createImageLinks('https://c.saavncdn.com/123/image-150x150.jpg')
      expect(links).toHaveLength(3)
      expect(links[0]?.quality).toBe('50x50')
      expect(links[1]?.quality).toBe('150x150')
      expect(links[2]?.quality).toBe('500x500')
      expect(links[0]?.url).toContain('50x50')
      expect(links[2]?.url).toContain('500x500')
      expect(links[0]?.url).toMatch(/^https:\/\//)
    })
  })

  describe('Live API Call', () => {
    it('should make a real search request using global fetch', async () => {
      const searchService = new SearchService()
      const results = await searchService.searchAll('Arijit Singh')

      expect(results).toBeDefined()
      expect(results).toHaveProperty('topQuery')
    }, 15000)

    it('should throw SaavnError on invalid song ID', async () => {
      const songService = new SongService()

      await expect(
        songService.getSongByIds({ songIds: 'completely-invalid-id-that-does-not-exist' })
      ).rejects.toThrow(SaavnError)
    }, 15000)
  })
})
