import React from "react";
import { Portal } from "../Portal";
import { Backdrop, CloseButton, DialogContent } from "./Dialog.styles";

type DialogProps = {
  open: boolean;
  keepState?: boolean;
  onClose: () => void;
  children: JSX.Element;
};

export const Dialog = ({
  children,
  open,
  onClose,
  keepState = false,
}: DialogProps) => {
  if (!open && !keepState) return null;

  return (
    <Portal id="portal">
      <Backdrop>
        <DialogContent open={open}>
          <CloseButton onClick={onClose} color="white" role="button" />
          {children}
        </DialogContent>
      </Backdrop>
    </Portal>
  );
};
