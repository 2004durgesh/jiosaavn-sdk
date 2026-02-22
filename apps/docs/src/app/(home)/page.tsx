import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center text-center flex-1 gap-6 px-4 py-16">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          JioSaavn SDK
        </h1>
        <p className="text-lg text-fd-muted-foreground max-w-xl">
          A universal, isomorphic TypeScript SDK for the JioSaavn API.
          Search, stream, and explore millions of songs, albums, artists, and playlists.
        </p>
      </div>

      <div className="flex flex-row gap-3">
        <Link
          href="/docs"
          className="inline-flex items-center justify-center rounded-lg bg-fd-primary text-fd-primary-foreground px-6 py-2.5 text-sm font-medium shadow-sm hover:opacity-90 transition-opacity"
        >
          Get Started
        </Link>
        <Link
          href="https://github.com/2004durgesh/jiosaavn-sdk"
          className="inline-flex items-center justify-center rounded-lg border border-fd-border px-6 py-2.5 text-sm font-medium hover:bg-fd-accent transition-colors"
        >
          GitHub
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full">
        <div className="rounded-xl border border-fd-border p-4 text-left">
          <h3 className="font-semibold mb-1">🎵 Songs & Albums</h3>
          <p className="text-sm text-fd-muted-foreground">
            Fetch songs by ID or link, get suggestions, and explore album details.
          </p>
        </div>
        <div className="rounded-xl border border-fd-border p-4 text-left">
          <h3 className="font-semibold mb-1">🎤 Artists</h3>
          <p className="text-sm text-fd-muted-foreground">
            Look up artist profiles, discographies, top songs, and albums.
          </p>
        </div>
        <div className="rounded-xl border border-fd-border p-4 text-left">
          <h3 className="font-semibold mb-1">🔍 Search</h3>
          <p className="text-sm text-fd-muted-foreground">
            Full-text search across songs, albums, artists, and playlists.
          </p>
        </div>
      </div>
    </div>
  );
}
