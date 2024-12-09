import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
// import { useGuest } from "./GuestContext";


export default function Nav() {
    const { data: session } = useSession();
    const [isGuest, setIsGuest] = useState();

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
            {<NavbarBrand>
                <p className="font-bold text-inherit ">BTP</p>
            </NavbarBrand>}

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
                                {isGuest ? "Hello, Guest" : `Hello, ${session?.user?.name || "User"}`}
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
    );
}












// import Link from 'next/link';
// import { useState, useEffect } from 'react';
// import { FaBars, FaTimes, FaBlog } from 'react-icons/fa';
// // import { motion, AnimatePresence } from 'framer-motion';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(true);

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add('dark');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//       localStorage.setItem('theme', 'light');
//     }
//   }, [darkMode]);

//   useEffect(() => {
//     const theme = localStorage.getItem('theme');
//     if (theme === 'dark') {
//       setDarkMode(true);
//     }
//   }, []);

//   const handleLinkClick = (e) => {
//     e.preventDefault(); // Prevent default anchor click behavior
//     setIsOpen(false); // Close the mobile menu if open
//     const href = e.currentTarget.getAttribute('href'); // Get the href attribute of the clicked element
//     const offsetTop = document.querySelector(href).offsetTop; // Calculate the top offset of the target element

//     window.scrollTo({
//       top: offsetTop - 100, // Adjust this value if your fixed navbar has a different height
//       behavior: 'smooth'
//     });
//   };

//   function capitalizeFirstLetter(string) {
//     if (!string) return string; // Return the original string if it's empty or undefined
//     return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
//   }

//   return (
//     <nav className="bg-background dark:bg-gray-900 nav-shadow fixed w-full z-50">
//       <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//         <Link href="/" className="text-2xl font-bold text-text-light flex items-center">
//           BTP
//         </Link>

//         {/* Desktop Menu */}
//         <ul className="hidden md:flex space-x-6">
//           {['#Home', '#Chatbot', '#About', '', '','', ''].map((section) => (
//             <li key={section}>
//               <a href={section} className="text-text hover:text-accent transition-colors" onClick={handleLinkClick}>
//                 {capitalizeFirstLetter(section.substring(1))}
//               </a>
//             </li>
//           ))}
//         </ul>

//         <div className="flex items-center space-x-4">
//           <Link href="/blog">
//             <button
//               className="text-text-light flex gap-2 focus:outline-none focus:ring-2 focus:ring-accent rounded"
//               aria-label="Toggle Dark Mode">
//               <FaBlog size={20} /> Blog
//             </button>
//           </Link>

//           <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-text-light focus:outline-none focus:ring-2 focus:ring-accent rounded" aria-label="Toggle Menu">
//             {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//           </button>
//         </div>
//       </div>

{/* Mobile Menu */ }
{/* <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="md:hidden bg-background dark:bg-gray-900 px-4 pt-4 pb-6 space-y-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {['#about', '#experience', '#projects', '#skills', '#achievements','#ask','#contact'].map((section) => (
              <li key={section}>
                <a href={section} className="block text-text-light hover:text-accent transition-colors" onClick={handleLinkClick}>
                {capitalizeFirstLetter(section.substring(1))}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence> */}
//     </nav>
//   );
// };

// export default Navbar;
