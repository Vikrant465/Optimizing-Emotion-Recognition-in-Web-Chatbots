import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { GuestProvider } from "../components/GuestProvider";


export default function App({ Component, pageProps }) {
  // return <Component {...pageProps} />;
  return (
    <SessionProvider session={pageProps.session}>
      <GuestProvider>
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
      </GuestProvider>
    </SessionProvider>
  );
}