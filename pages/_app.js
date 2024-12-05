import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";


export default function App({ Component, pageProps }) {
  // return <Component {...pageProps} />;
  return (
    <SessionProvider session={pageProps.session}>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </SessionProvider>
  );
}