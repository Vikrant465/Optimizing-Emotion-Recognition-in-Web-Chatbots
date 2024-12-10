import Nav from "../components/nav";
import ChatBox from "../components/ChatBox";
import { useSession, signOut } from "next-auth/react";
import { useGuest } from "../components/GuestProvider";
import { useTypewriter, Cursor } from "react-simple-typewriter";

export default function Home1() {
  // return (
  //   <div>
  //     <Nav />
  //     <div className="h-screen flex">
  //       <div className="w-2/3">
  //         <ChatBox />
  //       </div>
  //       <div className="w-1/3 bg-gray-200 p-4">
  //         <h2 className="text-center font-bold text-xl mb-4">Emoji Panel</h2>
  //         <EmojiPanel />
  //       </div>
  //     </div>
  //   </div>
  // );
  const { data: session } = useSession();
  const { isGuest } = useGuest();
  const [text] = useTypewriter({
    words: [
      "Login to Access, the Bot Section",
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
    <div className="bg-bot1 bg-no-repeat bg-cover bg-center ">
      <Nav />
      <ChatBox />
    </div>
  );
}








