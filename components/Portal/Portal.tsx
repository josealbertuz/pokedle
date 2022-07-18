import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { createWrapperElementAndAppendToBody } from "../../utils/utils";

type PortalProps = {
  children: JSX.Element;
  id: string;
};

export const Portal = ({ children, id }: PortalProps) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null
  );

  useLayoutEffect(() => {
    const wrapperElement =
      document.getElementById(id) ?? createWrapperElementAndAppendToBody(id);

    setWrapperElement(wrapperElement);

    return () => {
      wrapperElement.parentNode &&
        wrapperElement.parentNode.removeChild(wrapperElement);
    };
  }, [id]);

  if (!wrapperElement) return null;

  return createPortal(children, wrapperElement);
};
