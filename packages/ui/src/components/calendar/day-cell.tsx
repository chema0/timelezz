import { css } from "@emotion/react";
import { format } from "date-fns";

import { theme } from "..";
import { DateRange } from "../../types";
import { getDayCellStyle, getDayRoles } from "./calendar.controller";

type DayCellProps = {
  range: DateRange;
  day: Date;
  month: number;
  onDaySelection: () => void;
  onMouseEnter: () => void;
};

export default function DayCell({
  range,
  day,
  month,
  onDaySelection,
  onMouseEnter,
}: DayCellProps) {
  const dayRoles = getDayRoles(day, month, range);

  const { background, color, borderRadius } = getDayCellStyle(dayRoles);

  const isToday = dayRoles.includes("today");
  const isRangeStart = dayRoles.includes("range_start");
  const isRangeEnd = dayRoles.includes("range_end");

  const getBeforeStyle = () => {
    if (isRangeStart) {
      return `
        &:before {
          content: "";
          display: block;
          width: 50%;
          height: 100%;
          position: absolute;
          left: 0;
          z-index: 0;
          background: ${theme.background};
        }
    `;
    }
  };

  const getAfterStyle = () => {
    if (isRangeEnd) {
      return `
        &:after {
          content: "";
          display: block;
          width: 50%;
          height: 100%;
          position: absolute;
          right: 0;
          z-index: 0;
          background: ${theme.background};
        }
    `;
    }
  };

  return (
    <td
      onMouseEnter={onMouseEnter}
      css={css`
        flex: 1 1;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        cursor: pointer;
        position: relative;
        border-radius: ${borderRadius};
        background-color: ${isRangeStart || isRangeEnd
          ? theme.accents[2]
          : background};

        ${getBeforeStyle()}

        ${getAfterStyle()}

        &:first-child {
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }

        &:last-child {
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }
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
          height: 100%;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 500;
          text-align: center;
          border: 1px solid transparent;
          margin: 0;
          background-color: ${background};
          color: ${color};

          &:hover {
            border-color: ${isToday ? background : theme.accents[7]};
          }
        `}
      >
        {format(day, "d")}
      </span>
    </td>
  );
}
