import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { HeroUIProvider } from "@heroui/react";
import { GuestProvider } from "../components/GuestProvider";

export default function App({ Component, pageProps }) {
  // return <Component {...pageProps} />;
  return (
    <SessionProvider session={pageProps.session}>
      <GuestProvider>
        <HeroUIProvider>
          <Component {...pageProps} />
        </HeroUIProvider>
      </GuestProvider>
    </SessionProvider>
  );
}
