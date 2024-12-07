import Nav from "../components/nav";
import localFont from "next/font/local";
import { useSession, signOut } from "next-auth/react";
// import { Button } from "@nextui-org/react";
import Test from '../components/space'

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
  const { data: session } = useSession();
  // const [isGuest, setIsGuest] = useState(false);
  
  
  if (!session ) {
    return (
      <div>
        <Nav/>
        <div className="flex justify-center items-center h-screen">
          <p>You are not signed in.</p>
        </div>

        
      </div>
    );
  }

  return (
    <div>
      <Nav/>
      <div className="flex justify-center items-center h-screen">
        <p>Welcome, {session.user.name}!</p>
      </div>
    </div>
  );
}
