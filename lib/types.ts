export type Milliseconds = number;
export type Seconds = number;

export type WeatherInfo = {
  name: string;
  currentTime: string;
  weatherSummary?: string;
  current?: number;
  high?: number;
  low?: number;
};
