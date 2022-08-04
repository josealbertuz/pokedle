import { LetterStatus } from "../../models/pokedle";
import { styled } from "../../stitches.config";

export const KeyboardRoot = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: ".5em",
  padding: "1em",
});

export const KeysRow = styled("div", {
  display: "flex",
  gap: ".5em",
});

export const Key = styled("button", {
  minHeight: "55px",
  borderRadius: "5px",
  border: "none",
  fontWeight: "bold",
  "&:hover": {
    opacity: 0.6,
  },
  variants: {
    size: {
      large: {
        flex: 2,
      },
      small: {
        flex: 1,
      },
    },
    color: {
      [LetterStatus.CORRECT]: {
        backgroundColor: "$correct",
      },
      [LetterStatus.PRESENT]: {
        backgroundColor: "$present",
      },
      [LetterStatus.NOT_CHECKED]: {},
      [LetterStatus.NOT_PRESENT]: {
        backgroundColor: "$background",
      },
    },
  },
});
