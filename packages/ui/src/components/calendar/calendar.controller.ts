import { isSameDay, isToday, isWithinInterval } from "date-fns";
import { CSSProperties } from "react";

import { theme } from "..";
import { DateRange } from "../../types";
import { sortRange } from "../../utils";

type DayRole =
  | "today"
  | "range_start"
  | "range_end"
  | "in_range"
  | "different_month";

export function getDayRoles(
  day: Date,
  month: number,
  range: DateRange
): DayRole[] {
  const roles: DayRole[] = [];

  range = sortRange(range);

  if (day.getMonth() !== month) {
    roles.push("different_month");
  }

  if (isToday(day)) {
    roles.push("today");
  }

  if (isSameDay(day, range.start)) {
    if (isSameDay(day, range.end)) {
      return roles.concat(["range_start", "range_end"]);
    }

    return roles.concat("range_start");
  }

  if (isSameDay(day, range.end)) {
    return roles.concat("range_end");
  }

  if (isWithinInterval(day, range)) {
    return roles.concat("in_range");
  }

  return roles;
}

export function getDayCellStyle(roles: DayRole[]) {
  const style: CSSProperties = {
    background: theme.background,
    color: theme.foreground,
    borderRadius: "none",
  };

  if (roles.includes("different_month")) {
    style.color = theme.accents[4];
  }

  if (roles.includes("in_range")) {
    style.background = theme.accents[2];
  }

  if (roles.includes("today")) {
    style.background = theme.palette.success.normal;
    style.color = theme.palette.white;
  }

  if (roles.some((role) => role === "range_start" || role === "range_end")) {
    style.background = theme.foreground;
    style.color = theme.background;
    style.borderRadius = "4px";
  }

  return style;
}
