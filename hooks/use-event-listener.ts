import { useEffect } from "react";

export const useEventListener = <T extends keyof WindowEventMap>(
  event: T,
  handler: (this: Window, ev: WindowEventMap[T]) => any
) => {
  useEffect(() => {
    addEventListener(event, handler);

    return () => removeEventListener(event, handler);
  }, [event, handler]);
};
