// eslint-disable react/no-unescaped-entities 

import { Card, Skeleton, Accordion, AccordionItem } from "@nextui-org/react";
import Nav from "../components/nav";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useGuest } from "../components/GuestProvider";
import { motion } from "framer-motion";

import { useTypewriter, Cursor } from "react-simple-typewriter";
const teamMembers = [
  {
    name: "Vikrant Singh",
    role: "Full Stack Developer",
    photo: "/vik.jpg", // Replace with your image path

    linkedin: "https://www.linkedin.com/in/vikrant172singh/",
  },
  {
    name: "Atul Kumar Prajapati",
    role: "ML Expert",
    photo: "/atu2.jpg", // Replace with your image path   public\sp.jpg
    linkedin: "https://in.linkedin.com/in/atul9654",
  },
  {
    name: "Shishu Pal Sharma",
    role: "UI/UX Designer",
    photo: "/sp.jpg", // Replace with your image path
    linkedin: "https://www.linkedin.com/in/sps2001",
  },
  {
    name: "Shivam Singh",
    role: "ML Expert",
    photo: "/shi.jpg", // Replace with your image path
    linkedin: "http://www.linkedin.com/in/shivam-singh-439004209",
  },
];

export default function Home1() {
  const { data: session } = useSession();
  const { isGuest } = useGuest();
  const [text] = useTypewriter({
    words: [
      "Login to Access, the About Section",
    ],
    loop: 0, // 0 = infinite
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1000,
  });

  if (!session && !isGuest) {
    return (
      <div className="relative bg-about1 p-5 h-screen justify-items-center ">
        <Nav />
        <div className="flex-col text-xl justify-center items-center h-5 text-red-600">
          <p className="text-xl sm:text-2xl md:text-3xl text-text-dark">
            <span>{text}</span>
            <Cursor />
          </p>
        </div>
        <div className="flex-col items-end ...">
          <h2 className="text-7xl ">Emotion Prediction</h2>
          {/* <div className="">hello</div> */}
        </div>
      </div>
    );
  }
  return (
    <div className="">
      <Nav />
      <div className=" min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...">
        <h2 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-400 to-gold py-4 mb-8 font-serif drop-shadow-2xl tracking-wide uppercase border-b-4 border-gold max-w-4xl mx-auto">
          Our Team
        </h2>
        <div className="flex flex-wrap p-20 justify-center gap-10">
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
