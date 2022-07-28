import { styled } from "@stitches/react";
import { GrClose } from "react-icons/gr";

export const DialogContent = styled("dialog", {
  border: "none",
  "--dialog-padding": "1em",
  width: "min(500px, 100%)",
  margin: 0,
  height: "400px",
  position: "relative",
  backgroundColor: "#FAFAFA",
  padding: "var(--dialog-padding)",

  "@bp1": {
    height: "100%",
  },
});

export const Backdrop = styled("div", {
  position: "fixed",
  display: "grid",
  placeItems: "center",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
});

export const CloseButton = styled(GrClose, {
  position: "absolute",
  right: 0,
  top: 0,
  transform: "translateY(-150%)",
  fontSize: "1.2rem",

  "@bp1": {
    transform: "transformY(0%)",
    right: "var(--dialog-padding)",
    top: "var(--dialog-padding)",
  },
});
