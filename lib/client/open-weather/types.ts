export type OneCallApiV3Response = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: Current;
  daily: Daily[];
};

export type Current = {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Weather[];
};

export type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type Daily = {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary: string;
  temp: Temp;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Weather[];
  clouds: number;
  pop: number;
  rain: number;
  uvi: number;
};

export type FeelsLike = {
  day: number;
  night: number;
  eve: number;
  morn: number;
};

export type Temp = {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
};
