"use client";
import { useEffect, useRef, useState } from "react";
import { Location } from "../store/location/types";
import { WeatherInfo } from "../types";
import { useWeatherApi } from "../client/use-weather-api";
import { useLocationStore } from "../store/location/location";
import chunk from "lodash.chunk";
import { getTime } from "../utils/get-time";

export enum LocationWeatherStatus {
  LOADING = "LOADING",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
}

export type LocationWeatherState = {
  status: LocationWeatherStatus;
  weatherInfos: WeatherInfo[];
};

export function useWeatherForLocations(): LocationWeatherState {
  const cacheRef = useRef<Record<string, WeatherInfo>>({});
  const { locations } = useLocationStore();
  const [state, setState] = useState<LocationWeatherState>({
    status: LocationWeatherStatus.LOADING,
    weatherInfos: [],
  });
  const client = useWeatherApi();

  console.log("rendered in useWeatherForLocations", locations);

  const hydrateWeatherCache = () => {
    try {
      const cache = localStorage.getItem("weather-cache");
      if (!cache) {
        return;
      }
      cacheRef.current = JSON.parse(cache);
    } catch (e) {
      // Capture trace
    }
  };

  const storeWeatherCache = () => {
    try {
      localStorage.setItem("weather-cache", JSON.stringify(cacheRef.current));
    } catch (e) {
      // Capture trace
    }
  };

  const getWeatherInfo = async (location: Location): Promise<WeatherInfo> => {
    const cachedItem = cacheRef.current[location.name];
    if (cachedItem) {
      console.log("Cache hit:", cachedItem);
      return cachedItem;
    }
    const response = await client.getWeather({
      lat: location.lat,
      lon: location.lon,
    });
    const info = {
      name: location.name,
      currentTime: getTime(response.timezoneOffset),
      weatherSummary: response.description,
      current: response.currentTemp,
      high: response.highTemp,
      low: response.lowTemp,
    };
    cacheRef.current[location.name] = info;
    return info;
  };

  const fetchWeatherForLocations = async (locations: Location[]) => {
    try {
      hydrateWeatherCache();
      const chunks = chunk(locations, 3);
      const allWeatherInfos = [];
      for (const locationChunk of chunks) {
        const weatherPromises = locationChunk.map(getWeatherInfo);
        const weathers = await Promise.all(weatherPromises);
        allWeatherInfos.push(...weathers);
      }
      storeWeatherCache();
      setState({
        status: LocationWeatherStatus.SUCCESS,
        weatherInfos: allWeatherInfos,
      });
    } catch (e) {
      setState({
        status: LocationWeatherStatus.ERROR,
        weatherInfos: [],
      });
    }
  };

  useEffect(() => {
    fetchWeatherForLocations(locations);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations]);

  return state;
}
