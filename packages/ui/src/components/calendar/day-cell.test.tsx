import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { wrapCellInTable } from "../utils";
import DayCell from "./day-cell";

test("cell renders", async () => {
  render(
    wrapCellInTable(
      <DayCell
        range={{ start: null, end: null }}
        day={new Date()}
        onDaySelection={jest.fn()}
      />
    )
  );

  expect(screen.queryByRole("cell")).not.toBeNull();
});

test("renders styled if it's today", async () => {
  render(
    wrapCellInTable(
      <DayCell
        range={{ start: null, end: null }}
        day={new Date()}
        onDaySelection={jest.fn()}
      />
    )
  );

  // FIXME: play with classnames
  // expect(screen.queryByRole("cell")).toHaveStyle(
  //   `background: ${theme.background}`
  // );
  // expect(screen.queryByRole("cell")).toHaveStyle(`color: ${theme.foreground}`);
});
