import { css } from "@emotion/react";

type SpacerProps = {
  w?: number;
  h?: number;
};

export default function Spacer({ w = 1, h = 1 }: SpacerProps) {
  return (
    <div
      css={css`
        padding: ${h}px ${w}px;
      `}
    />
  );
}
