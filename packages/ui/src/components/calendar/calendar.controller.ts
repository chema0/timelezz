import { isSameDay, isToday, isWithinInterval } from "date-fns";
import { CSSProperties } from "react";

import { theme } from "..";
import { Range } from "../../types";

type DayRole = "today" | "range_start" | "range_end" | "in_range";

export function getDayRoles(day: Date, range: Range): DayRole[] {
  const roles: DayRole[] = [];

  if (isToday(day)) {
    roles.push("today");
  }

  if (range.start && isSameDay(day, range.start)) {
    return roles.concat("range_start");
  }

  if (range.end && isSameDay(day, range.end)) {
    return roles.concat("range_end");
  }

  // FIXME: check ts error
  if (
    range.start !== null &&
    range.end !== null &&
    isWithinInterval(day, range)
  ) {
    return roles.concat("in_range");
  }

  return roles;
}

export function getDayCellStyle(roles: DayRole[]) {
  const style: CSSProperties = {
    background: theme.background,
    color: theme.foreground,
  };

  if (roles.includes("today")) {
    style.background = theme.palette.success.normal;
    style.color = theme.palette.white;
  }

  if (roles.some((role) => role === "range_start" || role === "range_end")) {
    style.background = theme.foreground;
    style.color = theme.background;
  }

  if (roles.includes("in_range")) {
    style.background = theme.accents[2];
  }

  return style;
}
