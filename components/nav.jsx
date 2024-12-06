import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Nav() {
  const { data: session } = useSession();
  const [isGuest, setIsGuest] = useState(false);

  const handleGuestLogin = () => {
    setIsGuest(true);
  };

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
          <Link color="foreground" href="./about">
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="./home">
            Chat Bot
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="./">
            Home
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
