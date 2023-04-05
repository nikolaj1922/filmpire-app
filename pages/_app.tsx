import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import Header from "../components/Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthProvider } from "../hooks/useAuth";
import ModalProvider from "../context/modal";
import { grey } from "@mui/material/colors";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const progress = new ProgressBar({
  size: 4,
  color: "#dc2626",
  className: "z-50",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const theme = createTheme({
    palette: {
      primary: grey,
    },
  });

  if (Component.getLayout) {
    return Component.getLayout(
      <AuthProvider>
        <Component {...pageProps} />{" "}
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <ModalProvider>
        <ThemeProvider theme={theme}>
          <Header />
          <Component {...pageProps} />
        </ThemeProvider>
      </ModalProvider>
    </AuthProvider>
  );
}

export default MyApp;
