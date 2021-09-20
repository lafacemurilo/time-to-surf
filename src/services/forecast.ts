import * as HTTPUtil from '@src/util/request';
import { ForecastPoint } from './../clients/stormGlass';
import { StormGlass } from '@src/clients/stormGlass';

export enum BeachPosition {
  S = 'S',
  E = 'E',
  W = 'W',
  N = 'N',
}

export interface Beach {
  name: string;
  position: BeachPosition;
  lat: number;
  lng: number;
  user: string;
}

export interface BeachForecast extends Omit<Beach, 'user'>, ForecastPoint {}
const httputil = new HTTPUtil.Request();
export class Forecast {
  //diferente do waldemar eu instanciei a classe Request e passei o parametro esperado, no curso ele não passa parâmetro nenhum. fdp
  constructor(protected stormGlass = new StormGlass(httputil)) {}

  public async processForecastForBeaches(
    beaches: Beach[]
  ): Promise<BeachForecast[]> {
    let pointsWithCorrectSources: BeachForecast[] = [];
    for (const beach of beaches) {
      const points = await this.stormGlass.fetchPoints(beach.lat, beach.lng);
      const enrichedBeachData = points.map((e) => ({
        ...{
          lat: beach.lat,
          lng: beach.lng,
          name: beach.name,
          position: beach.position,
          rating: 2,
        },
        ...e,
      }));

      pointsWithCorrectSources.push(...enrichedBeachData);
    }

    return pointsWithCorrectSources;
  }
}
