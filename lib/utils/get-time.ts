import { Seconds } from "../types";
import { DateTime } from "luxon";

export const getTime = (offset: Seconds): string => {
  return DateTime.utc()
    .plus({ seconds: offset })
    .toLocaleString(DateTime.TIME_SIMPLE);
};
