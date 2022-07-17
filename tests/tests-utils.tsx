import { render, RenderOptions } from "@testing-library/react";
import { ToastProvider } from "../context/ToastContext";

type AllProvidersProps = {
    children: JSX.Element
}

const AllProviders = ({children}: AllProvidersProps) => {
    return (
        <ToastProvider>{children}</ToastProvider>
    )
}

export const customRender = (
    ui: JSX.Element,
    options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, {wrapper: AllProviders, ...options})