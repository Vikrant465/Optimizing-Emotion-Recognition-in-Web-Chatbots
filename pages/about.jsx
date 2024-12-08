// eslint-disable react/no-unescaped-entities 

import { Card, Skeleton, Accordion, AccordionItem } from "@nextui-org/react";
import Nav from "../components/nav";
import Image from "next/image";

const teamMembers = [
  {
    name: "Vikrant Singh",
    role: "AI Engineer",
    photo: "/sp.jpg", // Replace with your image path

    linkedin: "https://www.linkedin.com/in/alice-johnson/",
  },
  {
    name: "Atul Kumar Prajapati",
    role: "UI/UX Designer",
    // photo: "/team/bob.jpg", // Replace with your image path   public\sp.jpg
    linkedin: "https://www.linkedin.com/in/bob-smith/",
  },
  {
    name: "Shishu Pal Sharma",
    role: "Backend Developer",
    // photo: "/team/charlie.jpg", // Replace with your image path
    linkedin: "https://www.linkedin.com/in/charlie-davis/",
  },
  {
    name: "Shivam Singh",
    role: "Backend Developer",
    // photo: "/team/charlie.jpg", // Replace with your image path
    linkedin: "https://www.linkedin.com/in/charlie-davis/",
  },
];

export default function Home1() {
  return (
    <div>
      <Nav />
      <div className="min-h-screen bg-slate-700 flex flex-col items-center py-10 px-5">
        



        <h1 className="text-4xl font-bold text-gray-800 mb-6">About Our Project</h1>
        <p className="text-center text-lg text-gray-600 max-w-2xl mb-10">
          Welcome to our <span className="font-bold">Emotion Prediction Chatbot</span>! This project uses AI-driven
          emotion detection to provide meaningful and empathetic interactions. Here’s everything you need to know.
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
                We value collaboration! If you're passionate about AI, UI/UX design, or web development, share your
                feedback and ideas to help us improve.
              </p>
            </AccordionItem>
          </Accordion>
        </div>
      </div>


      <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...">
        <h2 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-400 to-gold py-4 mb-8 font-serif drop-shadow-2xl tracking-wide uppercase border-b-4 border-gold max-w-4xl mx-auto">
          Our Team
        </h2>
        <div className="flex flex-wrap justify-center gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="w-64 bg-white/90 rounded-lg shadow-xl p-5 text-center transform transition hover:scale-105"
            >
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  src={member.photo}
                  alt={member.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full border-4 border-gold"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-2 inline-block"
              >
                LinkedIn Profile
              </a>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
