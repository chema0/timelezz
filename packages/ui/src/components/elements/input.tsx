import { css } from "@emotion/react";
import { CSSProperties, InputHTMLAttributes } from "react";

import { theme } from "..";

type InputSize = "small" | "default" | "large";

type InputProps = Omit<InputHTMLAttributes<any>, "size"> & {
  size: InputSize;
};

export default function Input({ size = "default", ...props }: InputProps) {
  const baseStyle = {
    width: "100%",
    fontSize: "0.875rem",
    color: theme.accents[6],
    paddingLeft: "0.5em",
    border: `1px solid ${theme.accents[2]}`,
    borderRadius: "5px",
    "&:focus-visible": {
      outline: "1px solid",
    },
  };

  const style = () => {
    switch (size) {
      case "small":
        return css(baseStyle, {
          height: "28px",
          fontSize: "0.875rem",
        });

      case "large":
        return css(baseStyle, {
          height: "44px",
          fontSize: "0.875rem",
        });
      default:
        return css(baseStyle, {
          height: "36px",
          fontSize: "0.875rem",
        });
    }
  };

  return <input css={style()} {...props} />;
}
