import { css } from "@emotion/react";
import { format } from "date-fns";

import { theme } from "..";
import { DateRange } from "../../types";
import { Input, Spacer } from "../elements";

type DatesHeaderProps = {
  range: DateRange;
  formats?: {
    date: string;
    time: string;
  };
};

export default function DatesHeader({
  range,
  formats = {
    date: "dd MMM yyyy",
    time: "H:mm a O",
  },
}: DatesHeaderProps) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      `}
    >
      <div>
        <label css={labelCSS}>Start</label>
        <Spacer h={1} />
        <div
          css={css`
            display: flex;
            gap: 0.5rem;
          `}
        >
          <Input
            readOnly
            id="start-date"
            name="start-date"
            size="small"
            value={format(range.start, formats.date)}
          />
          <Input
            readOnly
            id="start-time"
            name="start-time"
            size="small"
            value={format(range.start, formats.time)}
          />
        </div>
      </div>

      <section>
        <label css={labelCSS}>End</label>
        <Spacer h={1} />
        <div
          css={css`
            display: flex;
            gap: 0.5rem;
          `}
        >
          <Input
            readOnly
            id="end-date"
            name="end-date"
            size="small"
            value={format(range.end, formats.date)}
          />
          <Input
            readOnly
            id="end-time"
            name="end-time"
            size="small"
            value={format(range.end, formats.time)}
          />
        </div>
      </section>
    </div>
  );
}

const labelCSS = css`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${theme.accents[5]};
`;
