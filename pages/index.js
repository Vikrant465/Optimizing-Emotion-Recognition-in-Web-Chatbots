import Nav from "../components/nav";
import localFont from "next/font/local";
// import { useSession, signOut } from "next-auth/react";
// import { Button } from "@nextui-org/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  
  
  return (
    <div>
      <Nav/>
      <div className="flex items-center justify-center h-screen">
        <h1> hello there </h1>
      </div>
    </div>
  );
}
