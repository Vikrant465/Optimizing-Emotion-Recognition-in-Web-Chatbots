

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
} from "@nextui-org/react";

import { signIn, signOut, useSession } from "next-auth/react";
import { useGuest } from "./GuestProvider";
import { useState } from "react";

export default function Nav() {
  const { data: session } = useSession();
  const { isGuest, setIsGuest } = useGuest(); // Access global state and setter
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // Modal state
  const [guestName, setGuestName] = useState("");

  const handleGuestLogin = () => {
    // Show modal when "Guest Login" is clicked
    onOpen();
  };

  const handleGuestSubmit = () => {
    if (guestName.trim()) {
      setIsGuest(true); // Set guest login state
      onOpenChange(false); // Close modal
    } else {
      alert("Please enter your name to log in as a guest.");
    }
  };

  const handleLogout = () => {
    setIsGuest(false); // Reset guest state
    setGuestName(""); // Clear guest name
    signOut(); // Optional: Sign out session user
  };

  return (
    <>
      {/* Guest Login Modal */}
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Guest Login
              </ModalHeader>
              <ModalBody>
                {/* Input for guest name */}
                <Input
                  label="Name"
                  placeholder="Enter your name"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={handleGuestSubmit} // Call guest login submit handler
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Navbar */}
      <Navbar shouldHideOnScroll>
        {/* Navbar Brand */}
        <NavbarBrand>
          <p className="font-bold text-inherit">BTP</p>
        </NavbarBrand>

        {/* Center Links */}
        <NavbarContent className="hidden sm:flex gap-8" justify="center">
          <NavbarItem>
            <Link color="foreground" href="./">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="./home">
              Chat Bot
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="./about">
              About
            </Link>
          </NavbarItem>
        </NavbarContent>

        {/* Right Actions */}
        <NavbarContent justify="end">
          {session || isGuest ? (
            <>
              <NavbarItem>
                <p className="text-sm font-medium">
                  {isGuest
                    ? `Hello, ${guestName || "Guest"}`
                    : `Hello, ${session?.user?.name || "User"}`}
                </p>
              </NavbarItem>
              <NavbarItem>
                <Button
                  as="button"
                  color="danger"
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
    </>
  );
}
