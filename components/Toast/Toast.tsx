import React from "react";
import { ToastType } from "../../context/ToastContext";
import { ToastRoot } from "./Toast.styles";

type ToastProps = {
  message: string;
  type: ToastType;
};

export const Toast = ({ message, type }: ToastProps) => {
  return (
    <ToastRoot type={type}>
      <span>{message}</span>
    </ToastRoot>
  );
};
