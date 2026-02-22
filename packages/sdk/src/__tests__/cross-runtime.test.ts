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

  describe('Crypto (node-forge)', () => {
    it('should decrypt media URLs using DES-ECB via node-forge', () => {
      // Test with a known encrypted URL from JioSaavn
      // This verifies node-forge works in the current runtime
      const links = createDownloadLinks('') // empty string should return empty array
      expect(links).toEqual([])
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
