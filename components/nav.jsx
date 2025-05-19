// test
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
} from "@heroui/react";

import { signIn, signOut, useSession } from "next-auth/react";
import { useGuest } from "./GuestProvider";
import { useState } from "react";

export default function Nav() {
  const { data: session } = useSession();
  const { isGuest, setIsGuest } = useGuest(); // Access global state and setter
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // Modal state
  const [guestName, setGuestName] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
  const menuItems = [
    { name: "Home", href: "./" },
    { name: "Chat Bot", href: "./home" },
    { name: "About", href: "./about" },
  ];

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
      <Navbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen} >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <p className="font-bold text-inherit pl-2">BTP</p>
          </NavbarBrand>
        </NavbarContent>

        {/* Center Links */}
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
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
                  onPress={handleLogout}
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
                  onPress={() => signIn("google")}
                >
                  Login with Google
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button
                  as="button"
                  color="primary"
                  variant="flat"
                  onPress={handleGuestLogin}
                >
                  Guest Login
                </Button>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.name}-${index}`}>
              <Link
                className="w-full"
                color={
                  index === 1 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                }
                href={item.href}
                size="lg"
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  );
}
