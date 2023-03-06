import { css } from "@emotion/react";
import { format, isSameDay, isToday, isWithinInterval } from "date-fns";

import { Range } from "../../types";
import { getDayCellStyle, getDayRoles } from "./calendar.controller";

type DayCellProps = {
  range: Range;
  day: Date;
  onDaySelection: () => void;
};

export default function DayCell({ range, day, onDaySelection }: DayCellProps) {
  const dayRoles = getDayRoles(day, range);

  const { background, color } = getDayCellStyle(dayRoles);

  console.log({ background, color });

  return (
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
          background-color: ${background};
          color: ${color};

          &:hover {
            border-radius: 4px;
            border-color: black;
          }
        `}
      >
        {format(day, "d")}
      </span>
    </td>
  );
}
