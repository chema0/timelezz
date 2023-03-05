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
import { css } from "@emotion/react";
import DayCell from "./day-cell";
import { Range } from "./../../types";

export default function Calendar() {
  const [month, setMonth] = useState(startOfMonth(Date.now()));

  const [range, setRange] = useState<Range>({
    start: null,
    end: null,
  });

  console.log({ range });

  const weekDay = Array.from(Array(7)).map((_, i) =>
    format(addDays(startOfWeek(new Date()), i), "EEEEE")
  );

  const handlePrevMonth = () =>
    setMonth((prev) => startOfMonth(subMonths(prev, 1)));

  const handleNextMonth = () =>
    setMonth((prev) => startOfMonth(addMonths(prev, 1)));

  const handleDaySelection = useCallback((day: Date) => {
    setRange((prev) => {
      if (prev.start) {
        return { ...prev, end: day };
      }

      return { ...prev, start: day };
    });
  }, []);

  return (
    <div
      css={css`
        width: 300px;
        height: 400px;
        padding: 12px;
        background: #fffc;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        border-radius: 5px;
      `}
    >
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
            font-weight: 400;
          `}
        >
          {format(month, "MMMM yyyy")}
        </span>
        <div>
          <div
            css={css`
              display: flex;
              gap: 1rem;
            `}
          >
            <div
              onClick={handlePrevMonth}
              css={css`
                cursor: pointer;
              `}
            >
              {"<"}
            </div>
            <div
              onClick={handleNextMonth}
              css={css`
                cursor: pointer;
              `}
            >
              {">"}
            </div>
          </div>
        </div>
      </div>
      <table width="100%">
        <thead
          css={css`
            display: flex;
            flex-wrap: nowrap;
            margin: 8px;
          `}
        >
          <tr
            css={css`
              display: flex;
              flex-wrap: nowrap;
            `}
          >
            {weekDay.map((day) => (
              <th
                key={day}
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
        <tbody>
          {eachWeekOfInterval({ start: month, end: endOfMonth(month) }).map(
            (week, i) => {
              return (
                <tr
                  key={i}
                  css={css`
                    display: flex;
                    flex-wrap: nowrap;
                    margin: 8px;
                  `}
                >
                  {eachDayOfInterval({
                    start: week,
                    end: endOfWeek(week),
                  }).map((day, j) => (
                    <DayCell
                      range={range}
                      day={day}
                      onDaySelection={() => handleDaySelection(day)}
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
