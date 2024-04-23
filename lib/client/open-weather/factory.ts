import { OpenWeatherApiClient } from "./open-weather-api-client";
import axios from "axios";

export class OpenWeatherApiClientFactory {
  static create(): OpenWeatherApiClient {
    const axiosInstance = axios.create({
      baseURL: "https://api.openweathermap.org",
    });
    const apiKey = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY;
    if (!apiKey) {
      throw new Error("OpenWeather API Key not found.");
    }
    return new OpenWeatherApiClient(axiosInstance, apiKey);
  }
}
