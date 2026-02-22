import type { z } from 'zod';
import type { ChartAPIResponseModel, ChartModel } from '#modules/discover/models';

export const createChartPayload = (chart: z.infer<typeof ChartAPIResponseModel>): z.infer<typeof ChartModel> => ({
  id: chart.id,
  name: chart.title,
  subtitle: chart.subtitle ?? null,
  type: chart.type,
  image: chart.image,
  url: chart.perma_url,
  language: chart.language ?? null,
  songCount: chart.count ?? null,
  explicitContent: chart.explicit_content === '1',
});
