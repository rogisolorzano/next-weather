"use client";
import {
  LocationWeatherStatus,
  useWeatherForLocations,
} from "@/lib/hooks/use-weather-for-locations";
import { WeatherInfo } from "@/lib/types";
import { Box, Card, Flex, Grid, Progress, Text } from "@radix-ui/themes";

function LocationItem(props: WeatherInfo) {
  const current = props.current ? Math.round(props.current) : "--";
  const high = props.high ? Math.round(props.high) : "--";
  const low = props.low ? Math.round(props.low) : "--";
  return (
    <Card>
      <Flex justify="between" pb="6">
        <Flex direction="column">
          <Text size="4" weight="bold">
            {props.name}
          </Text>
          <Text size="1" weight="bold">
            {props.currentTime}
          </Text>
        </Flex>
        <Text size={{ initial: "8", sm: "9" }}>{current}&deg;</Text>
      </Flex>
      <Flex justify="between">
        <Text size="1" weight="bold">
          {props.weatherSummary ?? "--"}
        </Text>
        <Flex gapX={"3"}>
          <Text size="2">H: {high}&deg;</Text>
          <Text size="2">L: {low}&deg;</Text>
        </Flex>
      </Flex>
    </Card>
  );
}

export default function LocationList() {
  const { status, weatherInfos } = useWeatherForLocations();

  if (status === LocationWeatherStatus.ERROR) {
    return (
      <Flex pt="8" justify="center">
        <Text>Add a city to get started</Text>
      </Flex>
    );
  }

  if (status === LocationWeatherStatus.LOADING) {
    return (
      <Flex pt="8" justify="center">
        <Progress />
      </Flex>
    );
  }

  if (weatherInfos.length === 0) {
    return (
      <Flex pt="8" justify="center">
        <Text>Add a city to get started</Text>
      </Flex>
    );
  }

  return (
    <Grid columns={{ initial: "1", sm: "2" }} gap="3">
      {weatherInfos.map((info, index) => (
        <LocationItem key={index} {...info} />
      ))}
    </Grid>
  );
}
