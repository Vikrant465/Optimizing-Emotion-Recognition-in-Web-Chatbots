// eslint-disable react/no-unescaped-entities
import Nav from "../components/nav";

import { useSession, signOut } from "next-auth/react";

import { Card, Skeleton, Accordion, AccordionItem } from "@nextui-org/react";

import { motion } from "framer-motion";

import { useTypewriter, Cursor } from "react-simple-typewriter";
import { useRouter } from "next/router";
import { useGuest } from "../components/GuestProvider";

const Home = () => {
  const router = useRouter();
  const { isGuest } = useGuest();
  const { data: session } = useSession();
  const goToHome = () => {
    router.push("/home");
  };
  const [text] = useTypewriter({
    words: [
      "Emotion Prediction",
      "Ml Model",
      "AI Support",
      "Audio Capabilities",
    ],
    loop: 0, // 0 = infinite
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1000,
  });

  if (!session && !isGuest) {
    return (
      <div>
        <Nav />
        <div className="inset-0 bg-opacity-10 bg-about1">
          <div className="flex-col items-center justify-center">
            <div className="flex text-red-700 justify-center items-center">
              <div className="text-2xl">
                <h1>You are not logged in, Please Sign In to access the bot</h1>
              </div>
            </div>

            <div className="min-h-screen flex flex-col items-center py-10 px-5 bg-chatbot1 overflow-y-scroll">
              <h1 className="text-4xl font-bold text-gray-800 mb-6">
                About Our Project
              </h1>
              <p className="text-center text-lg text-gray-600 max-w-2xl mb-10">
                Welcome to our{" "}
                <span className="font-bold">Emotion Prediction Chatbot</span>!
                This project uses AI-driven emotion detection to provide
                meaningful and empathetic interactions. Here’s everything you
                need to know.
              </p>
              <div className="w-full max-w-3xl text-teal-500 text-lg font-medium">
                <Accordion>
                  <AccordionItem key="1" title="🌟 Key Features">
                    <ul className="list-disc pl-5 text-gray-700">
                      <li>
                        Emotion Recognition: Understand user emotions like
                        happiness, sadness, and anger.
                      </li>
                      <li>
                        Responsive Design: Built using Next.js and Tailwind CSS
                        for a modern UI.
                      </li>
                      <li>
                        Interactive Components: Utilizes NextUI for accessible
                        and user-friendly elements.
                      </li>
                      <li>
                        AI-Powered: Leverages NLP to analyze and respond to user
                        inputs with empathy.
                      </li>
                    </ul>
                  </AccordionItem>
                  {/* Additional Accordion Items */}
                  <AccordionItem key="2" title="🛠 Technologies Used">
                    <ul className="list-disc pl-5 text-gray-700">
                      <li>Next.js: React framework for fast and scalable web applications.</li>
                      <li>Tailwind CSS: Utility-first CSS framework for rapid UI design.</li>
                      <li>NextUI: Modern library of accessible React components.</li>
                      <li>AI & NLP: Advanced techniques for sentiment analysis and emotion prediction.</li>
                    </ul>
                  </AccordionItem>
                  <AccordionItem key="3" title="🎯 Our Goal">
                    <p className="text-gray-700">
                      We aim to bridge the gap between technology and human
                      emotions by creating a chatbot that fosters empathetic and
                      personalized interactions.
                    </p>
                  </AccordionItem>
                  <AccordionItem key="4" title="🌍 Get Involved">
                    <p className="text-gray-700">
                      We value collaboration! If you're passionate about AI,
                      UI/UX design, or web development, share your feedback and
                      ideas to help us improve.
                    </p>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Nav />
      <section
        id="home"
        className="min-h-screen flex flex-col justify-center items-center bg-background text-text p-4 sm:p-6 relative overflow-hidden"
      >
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
              Welcome to Our BTP Project On<spam> Emotion Prediction</spam>
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
              AI powerde Emotion Prediction Bot.
            </motion.p>

            {/* Call to Action Button */}
            <div className="flex space-x-4">
              <motion.button
                className="px-5 sm:px-6 py-2 sm:py-3 bg-accent text-background rounded-full shadow-lg hover:bg-accent-light transition text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToHome}
                aria-label="Go to Chat Bot"
              >
                Go TO Chat Bot
              </motion.button>

              <motion.button
                className="px-5 sm:px-6 py-2 sm:py-3 bg-accent text-background rounded-full shadow-lg hover:bg-accent-light transition text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  window.open(
                    "https://docs.google.com/presentation/d/1hD8uWVO3FXLT4eIKOqaE0AIaiGo8vgxoGZuQ-hEFzIk/edit#slide=id.g32109155b0f_3_0",
                    "_blank"
                  );
                }}
                aria-label="Go to PPT"
              >
                Go To PPT
              </motion.button>
            </div>
          </div>

          {/* Right Column: Social & Contact Buttons */}
          <div className="flex flex-col items-start space-y-4">
            <div>
              <img
                src={"/emotions/chatbot.gif"}
                alt={"Bot image"}
                className="rounded-lg shadow-lg max-w-sm"
              />
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
