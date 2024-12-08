import Nav from "../components/nav";
import localFont from "next/font/local";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@nextui-org/react";
import Test from '../components/space'

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export default function Home() {
//   const { data: session } = useSession();
//   // const [isGuest, setIsGuest] = useState(false);


//   if (!session ) {
//     return (
//       <div>
//         <Nav/>
//         <div className="flex justify-center items-center h-screen">
//           <p>You are not signed in.</p>
//         </div>


//       </div>
//     );
//   }

//   return (
//     <div>
//       <Nav/>
//       <div className="flex justify-center items-center h-screen">
//         <p>Welcome, {session.user.name}!</p>
//       </div>
//     </div>
//   );
// }









// components/Home.jsx
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope, FaDownload, FaYoutube } from "react-icons/fa";
import { useTypewriter, Cursor } from 'react-simple-typewriter';

const Home = () => {
  const [text] = useTypewriter({
    words: ['Vikrant Singh', 'Shivam Singh', 'Shishu Pal Sharma', 'Atul Kumar Prajapati'],
    loop: 0, // 0 = infinite
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1000,
  });

  return (
    <div>
      <Nav/>
      <section id="home" className="min-h-screen flex flex-col justify-center items-center bg-background text-text p-4 sm:p-6 relative overflow-hidden">
        
        {/* Overlay for better readability if needed */}
        <div className="absolute inset-0 bg-opacity-10 bg-gradient-to-r from-transparent to-black pointer-events-none"></div>

        {/* Main Content */}
        <motion.div
          className="z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >

          {/* Left Column: Text Content */}
          <div className="flex flex-col items-start space-y-4">
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-text-light mb-2">
              Welcome To Our BTP Project
            </h1>

            {/* Typing Animation */}
            <p className="text-xl sm:text-2xl md:text-3xl text-text-dark">
              <span>{text}</span>
              <Cursor />
            </p>

            {/* Description */}
            <motion.p
              className="text-base sm:text-lg md:text-xl max-w-md text-text-dark mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Passionate about developing innovative solutions and automating workflows to enhance productivity.
            </motion.p>

            {/* Call to Action Button */}
            <motion.button
              className="mt-6 px-5 sm:px-6 py-2 sm:py-3 bg-accent text-background rounded-full shadow-lg hover:bg-accent-light transition text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
              aria-label="Explore My Work"
            >
              Explore My Work
            </motion.button>
          </div>

          {/* Right Column: Social & Contact Buttons */}
          <div className="flex flex-col items-start space-y-4">
            {/* Social & Contact Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:rishabh26072003@gmail.com"
                className="flex items-center space-x-2 bg-accent text-background px-4 py-2 rounded-full shadow-lg hover:bg-accent-light transition"
                aria-label="Email"
              >
                <FaEnvelope size={20} />
                <span>Email</span>
              </a>
              <a
                href="https://www.linkedin.com/in/rishabhxchoudhary/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-[#0077B5] text-background px-4 py-2 rounded-full shadow-lg hover:bg-primary-light transition"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://www.youtube.com/@rishabhxchoudhary"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-red-600 text-background px-4 py-2 rounded-full shadow-lg hover:bg-[#FF0000] transition"
                aria-label="YouTube"
              >
                <FaYoutube size={20} />
                <span>YouTube</span>
              </a>
              <a
                href="https://github.com/rishabhxchoudhary"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-secondary text-background px-4 py-2 rounded-full shadow-lg hover:bg-secondary-light transition"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
                <span>GitHub</span>
              </a>
              <a
                href="/resume.pdf"
                download="RishabhKumarChoudhary_Resume.pdf"
                className="flex items-center space-x-2 bg-accent text-background px-4 py-2 rounded-full shadow-lg hover:bg-accent-light transition"
                aria-label="Download Resume"
              >
                <FaDownload size={20} />
                <span>Resume</span>
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );

};

export default Home;

