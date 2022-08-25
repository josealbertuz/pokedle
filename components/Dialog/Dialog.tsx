import React, { PropsWithChildren } from "react";
import { Backdrop, CloseButton, DialogContent } from "./Dialog.styles";
import { GrClose } from "react-icons/gr";
import VisuallyHidden from "@reach/visually-hidden";

type DialogProps = PropsWithChildren<{
  open: boolean;
  keepState?: boolean;
  modal?: boolean;
  onClose: () => void;
}>;

export const Dialog = ({
  open,
  keepState = false,
  modal = false,
  onClose,
  children,
}: DialogProps) => {
  if (!open && !keepState) return null;

  return (
    <Backdrop
      onDismiss={onClose}
      dangerouslyBypassFocusLock={modal}
    >
      <DialogContent>
        <CloseButton onClick={onClose}>
          <VisuallyHidden>Close</VisuallyHidden>
          <GrClose />
        </CloseButton>
        {children}
      </DialogContent>
    </Backdrop>
  );
};
