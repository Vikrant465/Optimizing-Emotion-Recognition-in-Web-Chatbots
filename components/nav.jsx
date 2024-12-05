// import {
//   Navbar,
//   NavbarBrand,
//   NavbarContent,
//   NavbarItem,
//   Link,
//   Button,
// } from "@nextui-org/react";
// // import {AcmeLogo} from "./AcmeLogo.jsx";


// export default function Nav() {

//   return (
//     <Navbar shouldHideOnScroll>
//       <NavbarBrand>
//         {/* <AcmeLogo /> */}
//         <p className="font-bold text-inherit">BTP</p>
//       </NavbarBrand>
//       <NavbarContent className="hidden sm:flex gap-4" justify="center">
//         <NavbarItem>
//           <Link color="foreground" href="#">
//             About
//           </Link>
//         </NavbarItem>
//         <NavbarItem isActive>
//           <Link href="#" aria-current="page">
//             Chat Bot
//           </Link>
//         </NavbarItem>
//         <NavbarItem>
//           <Link color="foreground" href="#">
//             contact
//           </Link>
//         </NavbarItem>
//       </NavbarContent>
//       <NavbarContent justify="end">
//         <NavbarItem className="hidden lg:flex">
//           <Link href="../pages/api/auth/callback/google">Login</Link>
//         </NavbarItem>
//         <NavbarItem>
//           <Button as={Link} color="primary" href="#" variant="flat">
//             Sign Up
//           </Button>
//         </NavbarItem>
//       </NavbarContent>
//     </Navbar>
//   );
// }



import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Nav() {
  const { data: session } = useSession();
  const [isGuest, setIsGuest] = useState(false);

  // Handle guest login
  const handleGuestLogin = () => {
    setIsGuest(true);
  };

  // Handle logout
  const handleLogout = () => {
    setIsGuest(false);
    signOut();
  };

  return (
    <Navbar shouldHideOnScroll>
      {/* Navbar Brand */}
      <NavbarBrand>
        <p className="font-bold text-inherit">BTP</p>
      </NavbarBrand>

      {/* Center Links */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#about">
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#chat-bot">
            Chat Bot
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#contact">
            Contact
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Right Actions */}
      <NavbarContent justify="end">
        {session || isGuest ? (
          <>
            <NavbarItem>
              <p className="text-sm font-medium">
                {isGuest ? "Hello, Guest" : `Hello, ${session?.user?.name || "User"}`}
              </p>
            </NavbarItem>
            <NavbarItem>
              <Button
                as="button"
                color="primary"
                variant="flat"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <Button
                as="button"
                color="primary"
                variant="flat"
                onClick={() => signIn("google")}
              >
                Login with Google
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                as="button"
                color="primary"
                variant="flat"
                onClick={handleGuestLogin}
              >
                Guest Login
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
