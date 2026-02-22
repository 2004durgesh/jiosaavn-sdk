import { Endpoints } from '#common/constants';
import { useFetch } from '#common/helpers';
import { createChartPayload } from '#modules/discover/helpers';
import type { IUseCase } from '#common/types';
import type { ChartAPIResponseModel, ChartModel } from '#modules/discover/models';
import type { z } from 'zod';

export class GetChartsUseCase {
  constructor() {}

  async execute() {
    const { data } = await useFetch<z.infer<typeof ChartAPIResponseModel>[]>({
      endpoint: Endpoints.discover.charts,
      params: {},
    });

    return data.map((chart) => createChartPayload(chart));
  }
}
