import type { AppProps } from "next/app";
import { globalStyles } from "../stitches.config";
import { ToastProvider } from "../context/ToastContext";

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <ToastProvider>
      <Component {...pageProps} />
    </ToastProvider>
  );
}

export default MyApp;
