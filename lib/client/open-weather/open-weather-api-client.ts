import {
  GetWeatherRequest,
  GetWeatherResponse,
  WeatherApi,
} from "../weather-api.interface";
import { AxiosInstance } from "axios";
import { OneCallApiV3Response } from "./types";

export class OpenWeatherApiClient implements WeatherApi {
  constructor(
    private readonly axios: AxiosInstance,
    private readonly apiKey: string,
  ) {}

  async getWeather(request: GetWeatherRequest): Promise<GetWeatherResponse> {
    const { data } = await this.axios.get<OneCallApiV3Response>(
      "/data/3.0/onecall",
      {
        params: {
          lat: request.lat,
          lon: request.lon,
          appid: this.apiKey,
          units: "imperial",
          exclude: "minutely,hourly,alerts",
        },
      },
    );
    const daily = data.daily?.[0];
    const weather = data.current.weather?.[0];

    return {
      lat: data.lat,
      lon: data.lon,
      timezone: data.timezone,
      timezoneOffset: data.timezone_offset,
      currentTemp: data.current.temp,
      highTemp: daily?.temp.max,
      lowTemp: daily?.temp.min,
      description: weather?.main,
      iconUrl: weather?.icon
        ? `http://openweathermap.org/img/w/${weather.icon}.png`
        : undefined,
    };
  }
}
