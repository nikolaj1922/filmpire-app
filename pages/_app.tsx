import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import Header from "../components/Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthProvider } from "../hooks/useAuth";
import ModalProvider from "../context/modal";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const theme = createTheme();

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
