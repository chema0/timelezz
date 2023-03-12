import { css } from "@emotion/react";
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { useCallback, useState } from "react";

import { theme } from "..";
import { sortRange } from "../../utils";
import { Spacer } from "../elements";
import { ChevronLeftIcon, ChevronRightIcon } from "../icons";
import { DateRange } from "./../../types";
import DatesHeader from "./dates-header";
import DayCell from "./day-cell";

export default function Calendar() {
  const [month, setMonth] = useState(startOfMonth(Date.now()));

  const [{ range, active, nextEnd }, setSelection] = useState<{
    range: DateRange;
    active: boolean;
    nextEnd: Date;
  }>({
    range: {
      start: new Date(),
      end: new Date(),
    },
    active: false,
    nextEnd: new Date(),
  });

  const weekDay = Array.from(Array(7)).map((_, i) =>
    format(addDays(startOfWeek(new Date()), i), "EEEEE")
  );

  const handlePrevMonth = () =>
    setMonth((prev) => startOfMonth(subMonths(prev, 1)));

  const handleNextMonth = () =>
    setMonth((prev) => startOfMonth(addMonths(prev, 1)));

  const handleDaySelection = useCallback((day: Date) => {
    setSelection((prev) => {
      if (!prev.active) {
        return {
          range: { ...prev.range, start: day },
          active: true,
          nextEnd: day,
        };
      }

      const sortedRange = sortRange({ ...prev.range, end: day });
      return {
        range: sortedRange,
        active: false,
        nextEnd: day,
      };
    });
  }, []);

  const handleMouseOver = useCallback(
    (day: Date) => {
      if (active) {
        setSelection((prev) => ({ ...prev, nextEnd: day }));
      }
    },
    [active]
  );

  return (
    <div
      css={css`
        width: 280px;
        height: 100%;
        padding: 12px;
        background: #fffc;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        border-radius: 5px;
      `}
    >
      <DatesHeader range={range} />

      <Spacer h={6} />

      <div
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          height: 1.75rem;
        `}
      >
        <span
          css={css`
            font-size: 14px;
            font-weight: 600;
          `}
        >
          {format(month, "MMMM yyyy")}
        </span>
        <div>
          <div
            css={css`
              display: flex;
              gap: 0.5rem;
            `}
          >
            <div
              onClick={handlePrevMonth}
              css={css`
                cursor: pointer;
              `}
            >
              <ChevronLeftIcon
                color={theme.accents[5]}
                css={css`
                  &:hover {
                    color: black;
                  }
                `}
              />
            </div>
            <div
              onClick={handleNextMonth}
              css={css`
                cursor: pointer;
              `}
            >
              <ChevronRightIcon
                color={theme.accents[5]}
                css={css`
                  &:hover {
                    color: black;
                  }
                `}
              />
            </div>
          </div>
        </div>
      </div>

      <Spacer h={2} />

      <table
        css={css`
          border-collapse: collapse;
          table-layout: fixed;
          display: block;
          position: relative;
        `}
      >
        <thead
          css={css`
            display: block;
          `}
        >
          <tr
            css={css`
              display: flex;
              flex-wrap: nowrap;
              flex: 1 1;
              color: ${theme.accents[5]};
              margin: 8px 0;
            `}
          >
            {weekDay.map((day, i) => (
              <th
                key={i}
                css={css`
                  flex: 1 1;
                  padding: 0;
                  font-size: 0.75em;
                  font-weight: 500;
                  text-align: center;
                  text-transform: uppercase;
                `}
              >
                <span>{day}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          css={css`
            opacity: 1;
            transform: translateX(0%) translateZ(0px);
            display: block;
          `}
        >
          {eachWeekOfInterval({ start: month, end: endOfMonth(month) }).map(
            (week, i) => {
              return (
                <tr
                  key={i}
                  css={css`
                    display: flex;
                    flex-wrap: nowrap;
                    margin: 0.5rem 0;
                    border-radius: 0 4px 4px 0;
                  `}
                >
                  {eachDayOfInterval({
                    start: week,
                    end: endOfWeek(week),
                  }).map((day, j) => (
                    <DayCell
                      range={active ? { ...range, end: nextEnd } : range}
                      day={day}
                      month={month.getMonth()}
                      onDaySelection={() => handleDaySelection(day)}
                      onMouseEnter={() => handleMouseOver(day)}
                      key={`${i}-${j}`}
                    />
                  ))}
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
}
