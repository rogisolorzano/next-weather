export type GetWeatherRequest = {
  lat: number;
  lon: number;
};

export type GetWeatherResponse = {
  lat: number;
  lon: number;
  timezone: string;
  timezoneOffset: number;
  currentTemp: number;
  highTemp?: number;
  lowTemp?: number;
  description?: string;
  iconUrl?: string;
};

export interface WeatherApi {
  getWeather(request: GetWeatherRequest): Promise<GetWeatherResponse>;
}
