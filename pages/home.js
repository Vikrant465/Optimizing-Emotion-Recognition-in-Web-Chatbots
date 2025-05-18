import Nav from "../components/nav";
import ChatBox from "../components/ChatBox";
import { useSession, signOut } from "next-auth/react";
import { useGuest } from "../components/GuestProvider";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, Input } from "@heroui/react";

export default function Home1() {
  const { data: session } = useSession();
  const { isGuest } = useGuest();

  const [showModal, setShowModal] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [text] = useTypewriter({
    words: [
      "Login to Access, the Bot Section",
    ],
    loop: 0, // 0 = infinite
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1000,
  });
  const hasCheckedRecovery = useRef(false);

  useEffect(() => {
    const checkRecoveryEmail = async () => {
      if (hasCheckedRecovery.current || !session?.user?.email || isGuest) return;
      hasCheckedRecovery.current = true;
      if (session?.user?.email && !isGuest) {
        try {
          const res = await axios.get(`/api/recovery_email?email=${session.user.email}`);
          if (!res.data.recovery_email) {
            setShowModal(true);
          } else {
            setSubmitted(true);
          }
        } catch (err) {
          console.error("Error checking recovery email:", err);
          setShowModal(true);
        }
      }
    };
    checkRecoveryEmail();
  }, [session, isGuest]);

  const handleRecoverySubmit = async () => {
    if (!recoveryEmail || !session?.user?.email) return;
    try {
      await axios.post("/api/recovery_email", {
        email: session.user.email,
        recovery_email: recoveryEmail,
      });
      setSubmitted(true);
      setShowModal(false);
    } catch (error) {
      console.error("Error saving recovery email:", error);
    }
  };

  
  if (!session && !isGuest) {
    return (
      <div className="relative bg-about1 bg-no-repeat bg-cover bg-center p-5 h-screen justify-items-center ">
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
      <div className="absolute w-screen">
        <Nav />
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Enter Recovery Email</h2>
            <Input
              type="email"
              value={recoveryEmail}
              onChange={(e) => setRecoveryEmail(e.target.value)}
              placeholder="Enter your recovery email"
            />
            <div className="flex justify-between mt-4">
              <Button
                onPress={handleRecoverySubmit}
                color="primary"
              >
                Submit
              </Button>
              <Button
                onPress={() => {
                  setShowModal(false);
                  setSubmitted(true);
                }}
                color="danger"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {submitted && <ChatBox />}
    </div>
  );
}