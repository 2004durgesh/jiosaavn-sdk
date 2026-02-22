import { GetNewReleasesUseCase } from '#modules/discover/use-cases';
import { beforeAll, describe, expect, it } from 'vitest';

describe('GetNewReleases', () => {
  let useCase: GetNewReleasesUseCase;

  beforeAll(() => {
    useCase = new GetNewReleasesUseCase();
  });

  it('should return a list of new releases', async () => {
    const releases = await useCase.execute();

    expect(releases.length).toBeGreaterThan(0);
    expect(releases[0]!.id).toBeDefined();
    expect(releases[0]!.name).toBeDefined();
    expect(releases[0]!.type).toBeDefined();
  });

  it('should respect the limit parameter', async () => {
    const releases = await useCase.execute({ limit: 5 });

    expect(releases.length).toBeLessThanOrEqual(5);
  });
});
