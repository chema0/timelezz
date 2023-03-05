import { ReactNode } from "react";

export function wrapCellInTable(cell: ReactNode) {
  return (
    <table>
      <tbody>
        <tr>{cell}</tr>
      </tbody>
    </table>
  );
}
