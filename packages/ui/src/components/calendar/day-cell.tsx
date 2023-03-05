import { css } from "@emotion/react";
import { format, isSameDay, isToday, isWithinInterval } from "date-fns";

import { Range } from "../../types";

type DayCellProps = {
  range: Range;
  day: Date;
  onDaySelection: () => void;
};

export default function DayCell({ range, day, onDaySelection }: DayCellProps) {
  const palette = {
    success: "blue",
    background: "white",
    foreground: "black",
    accents_2: "gray",
  };

  const isRangeStart = range.start && isSameDay(range.start, day);
  const isRangeEnd = range.end && isSameDay(range.end, day);

  const getCellStyle = () => {
    if (isToday(day)) {
      return {
        background: palette.success,
        color: palette.background,
      };
    }

    if (isRangeStart) {
      return {
        background: palette.foreground,
        color: palette.background,
      };
    }

    if (isRangeEnd) {
      return {
        background: palette.foreground,
        color: palette.background,
      };
    }

    if (range.start !== null && range.end !== null) {
      if (isWithinInterval(day, range))
        return {
          background: palette.accents_2,
          color: palette.foreground,
        };
    }

    return {
      background: palette.background,
      color: palette.foreground,
    };
  };

  return (
    <>
      <td
        css={css`
          flex: 1 1;
          display: flex;
          justify-content: center;
          width: 32px;
          height: 32px;
          padding: 0;
          text-align: center;
          cursor: pointer;
        `}
      >
        <span
          onClick={onDaySelection}
          css={css`
            z-index: 1;
            outline: none;
            display: block;
            line-height: 30px;
            width: 32px;
            height: 32px;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 500;
            text-align: center;
            border: 1px solid transparent;
            margin: 0;

            &:hover {
              border-radius: 4px;
              border-color: black;
            }
          `}
          style={getCellStyle()}
        >
          {format(day, "d")}
        </span>
      </td>
    </>
  );
}
