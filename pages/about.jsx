// eslint-disable react/no-unescaped-entities 

import { Card, Skeleton, Accordion, AccordionItem } from "@nextui-org/react";
import Nav from "../components/nav";

export default function Home1() {
  return (
    <div>
      <Nav />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-5">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">About Our Project</h1>
      <p className="text-center text-lg text-gray-600 max-w-2xl mb-10">
        Welcome to our <span className="font-bold">Emotion Prediction Chatbot</span>! This project uses AI-driven
        emotion detection to provide meaningful and empathetic interactions. Here&apos;s everything you need to know.
      </p>

      <div className="w-full max-w-3xl">
        <Accordion>
          <AccordionItem key="1" title="🌟 Key Features">
            <ul className="list-disc pl-5 text-gray-700">
              <li>Emotion Recognition: Understand user emotions like happiness, sadness, and anger.</li>
              <li>Responsive Design: Built using Next.js and Tailwind CSS for a modern UI.</li>
              <li>Interactive Components: Utilizes NextUI for accessible and user-friendly elements.</li>
              <li>AI-Powered: Leverages NLP to analyze and respond to user inputs with empathy.</li>
            </ul>
          </AccordionItem>
          <AccordionItem key="2" title="🛠️ Technologies Used">
            <ul className="list-disc pl-5 text-gray-700">
              <li>Next.js: React framework for fast and scalable web applications.</li>
              <li>Tailwind CSS: Utility-first CSS framework for rapid UI design.</li>
              <li>NextUI: Modern library of accessible React components.</li>
              <li>AI & NLP: Advanced techniques for sentiment analysis and emotion prediction.</li>
            </ul>
          </AccordionItem>
          <AccordionItem key="3" title="🎯 Our Goal">
            <p className="text-gray-700">
              We aim to bridge the gap between technology and human emotions by creating a chatbot that fosters
              empathetic and personalized interactions.
            </p>
          </AccordionItem>
          <AccordionItem key="4" title="🌍 Get Involved">
            <p className="text-gray-700">
              We value collaboration! If you&apos;re passionate about AI, UI/UX design, or web development, share your
              feedback and ideas to help us improve.
            </p>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
    </div>
  );
}
