import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { Toast } from "../components/Toast";

export enum ToastType {
  SUCCESS = "SUCCESS",
  WARNING = "WARNING",
  ERROR = "ERROR",
}

type ToastState = {
  message: string;
  type: ToastType;
  duration: number;
};

type ToastContextProps = {
  show: (state: ToastState) => void;
};

const ToastContext = createContext<ToastContextProps | null>(null);

type ToastProviderProps = {
  children: JSX.Element;
};

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const show = useCallback(
    (newToast: ToastState) => {
      setToasts(toasts => [newToast, ...toasts]);
    },
    []
  );

  const reset = useCallback(() => {
    setToasts(toasts.slice(0, -1));
  }, [toasts]);

  useEffect(() => {
    if (toasts.length < 1) return;

    const id = setTimeout(reset, toasts[toasts.length - 1].duration);

    return () => clearTimeout(id);
  }, [toasts, reset]);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {toasts.map(({message, type}, index) => (
        <Toast key={`toast-${index}`} message={message} type={type} />
      ))}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context.show;
};
