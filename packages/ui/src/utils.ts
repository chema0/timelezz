import { isBefore } from "date-fns";

import { DateRange } from "./types";

export function sortRange(range: DateRange) {
  if (isBefore(range.end, range.start)) {
    return { start: range.end, end: range.start };
  }

  return range;
}
