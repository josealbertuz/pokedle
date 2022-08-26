import { styled } from "../../stitches.config";

export const PressableRoot = styled("button", {
  display: "inline-grid",
  placeContent: "center",
  fontSize: "1.2rem",
  minHeight: "2em",
  minWidth: "2em",
  border: "none",
  backgroundColor: "transparent",
  borderRadius: "10px",
  px: '0.8em',

  "&:hover": {
    backgroundColor: "$buttonHover",
  },

  "&:focus": {
    outlineColor: "$buttonHover",
  },
});
