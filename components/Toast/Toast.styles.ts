import { styled } from "@stitches/react";

export const ToastRoot = styled("div", {
  padding: '1em',
  width: 'min(400px, 100%)',
  position: 'fixed',
  bottom: '16px',
  right: '16px',

  variants: {
    type: {
      SUCCESS: {
        backgroundColor: "$correct",
      },
      WARNING: {
        backgroundColor: "$present",
      },
      ERROR: {
        backgroundColor: "$error",
      },
    },
  },
});
