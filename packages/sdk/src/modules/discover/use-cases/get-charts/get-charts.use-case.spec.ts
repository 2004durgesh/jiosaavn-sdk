import { ChartModel } from '#modules/discover/models';
import { GetChartsUseCase } from '#modules/discover/use-cases';
import { beforeAll, describe, expect, it } from 'vitest';

describe('GetCharts', () => {
  let useCase: GetChartsUseCase;

  beforeAll(() => {
    useCase = new GetChartsUseCase();
  });

  it('should return a list of charts', async () => {
    const charts = await useCase.execute();

    expect(charts.length).toBeGreaterThan(0);
    expect(() => ChartModel.parse(charts[0])).not.toThrow();
  });

  it('should have correct fields for each chart', async () => {
    const charts = await useCase.execute();
    const chart = charts[0]!;

    expect(chart.id).toBeDefined();
    expect(chart.name).toBeDefined();
    expect(chart.type).toBe('playlist');
  });
});
