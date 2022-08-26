import { styled } from '../../stitches.config';
import * as ReachDialog from '@reach/dialog'

export const DialogContent = styled(ReachDialog.DialogContent, {
  border: "none",
  "--dialog-padding": "1em",
  maxWidth: 'var(--max-game-width)',
  width: '100%',
  margin: 0,
  height: "100%",
  position: "relative",
  padding: "var(--dialog-padding)",
});

export const Backdrop = styled(ReachDialog.DialogOverlay, {
  position: "fixed",
  display: "grid",
  placeItems: "center",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: 'white'
});

export const CloseButton = styled("button", {
  display: "inline-grid",
  placeContent: "center",
  position: "absolute",
  right: "var(--dialog-padding)",
  top: "var(--dialog-padding)",
  fontSize: "1.2rem",
  minHeight: "2em",
  minWidth: "2em",
  border: "none",
  backgroundColor: "transparent",
  borderRadius: "10px",

  "&:hover": {
    backgroundColor: "$background",
    opacity: 0.5,
  },

  "&:focus": {
    outlineColor: "$background",
  },
});
