# JioSaavn SDK 🎵

A universal, isomorphic TypeScript SDK for the JioSaavn API.

This SDK provides a clean, strongly-typed, and robust interface to interact with JioSaavn's unofficial API endpoints. It works seamlessly across **Node.js, Bun, Browsers, and React Native**.

> **Acknowledgments:** A massive thank you to [sumitkolhe/jiosaavn-api](https://github.com/sumitkolhe/jiosaavn-api) for the incredible reverse-engineering and research on the JioSaavn API. This SDK is proudly built upon the foundational knowledge and endpoint structures discovered in that project.

---

## Features

- **Isomorphic Support**: Runs anywhere JavaScript runs (Node.js, edge runtimes, browsers, React Native).
- **Type Safety**: Built with TypeScript from the ground up.
- **Data Validation**: Uses [Zod](https://zod.dev/) to parse and validate API responses into clean, predictable camelCase models.
- **Comprehensive Coverage**: Includes modules for Songs, Albums, Artists, Playlists, Search, and Discovery (Charts, Trending, New Releases).
- **No Dependencies**: Zero dependencies other than `zod` and standard web APIs (`fetch`).

## Monorepo Structure

This project is a monorepo managed with npm workspaces:

- `packages/sdk`: The core isomorphic SDK library.
- `apps/docs`: The fumadocs-powered documentation site.
- `apps/rn-test`: A React Native application used for validating SDK compatibility in Metro bundler environments.

## Installation

```bash
npm install jiosaavn-sdk
```

## Quick Start

```typescript
import { SearchService, SongService, DiscoverService } from 'jiosaavn-sdk'

// 1. Search for a song
const search = new SearchService()
const results = await search.searchSongs({ query: 'Levitating', limit: 1 })

const songId = results.results[0].id

// 2. Get high-quality streaming details
const songs = new SongService()
const songDetails = await songs.getSongByIds({ songIds: songId })

console.log(songDetails[0].downloadUrl) // Direct AAC/MP4 URLs (12kbps to 320kbps)

// 3. Browse trending charts
const discover = new DiscoverService()
const charts = await discover.getCharts()
```

## Documentation

Full API reference and guides are available in the documentation site:
👉 **[View Documentation](./apps/docs)**

## Development Scripts

From the repository root:

- `npm run dev:docs` — Start the documentation site locally
- `npm run build:sdk` — Build the SDK package (CJS, ESM, DTS)
- `npm run test:sdk` — Run the test suite using Vitest
- `npm run format` — Format the entire codebase using Prettier
