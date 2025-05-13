import { useState, useEffect ,useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { useGuest } from "../components/GuestProvider";
import { Button,Input } from "@heroui/react";


import axios from "axios";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [useremotion, setuseremotion] = useState("");
  const [botemotion, setbotemotion] = useState("");
  const { data: session } = useSession();
  const { isGuest } = useGuest();

 // Ref for auto-scrolling to the latest message
  const chatEndRef = useRef(null);
  useEffect(() => {
    // Auto-scroll to the latest message
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

// Fetch chat history when user logs in
  const handelpreviousmessages = async() => {
    console.log("clicked")
      const email = session?.user?.email;
      if (!email) return;

      try {
        const res = await axios.get(`/api/getChatHistory?email=${email}`);
        setMessages(res.data.messages || []);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
  };
  const deletepreviousmessages = async() => {
    console.log("clicked")
      const email = session?.user?.email;
      if (!email) return;

      try {
        const res = await axios.delete(`/api/getChatHistory?email=${email}`);
        setMessages(res.data.messages || []);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
  };

  // Speak the chatbot's response
  const speak = (text) => {
    if (window.responsiveVoice) {
      window.responsiveVoice.speak(text, "UK English Female", {
        rate: 1, // Adjust the rate (speed) as needed
        pitch: 0.75, // Adjust the pitch
        volume: 1, // Adjust the volume (0-1)
      });
    } else {
      console.error("ResponsiveVoice is not available.");
    }
  };

  const handleSend = async () => {
    if (!userInput.trim()) return;
    // Add user message
    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);
    try {
      const email = session?.user?.email;
      console.log("email : ",email)
      
      const preres = await axios.get(`/api/getChatHistory?email=${email}`);
      const pre_chat = preres.data.messages || [];
      console.log("pre_chat : ",pre_chat)
      
      const res = await axios.post("/api/ml", { question: userInput , pre_chat: pre_chat});
      const botResponse = res.data.ai_response;
      console.log("res : ", res);
      // Add bot response to messages
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: botResponse },
      ]);
      setuseremotion(res.data.user_predicted_emotion);
      setbotemotion(res.data.predicted_emotion);
    
      // Speak the bot's response
      speak(botResponse); // Speak the response
      // DB setup
    
      // DB access begin 
      if (email) {
        await axios.post("/api/hello", {
          email,
          user_msg: userInput,
          AI_response: botResponse,
        });
      }
      
      console.log("Document added to MongoDB");

    } catch (err) {
      console.error(err);
      const errorResponse = "Error: Unable to fetch AI response.";
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: errorResponse },
      ]);
      speak(errorResponse); // Speak the error message
    }
    setUserInput("");
  };

  const handleVoiceInput = () => {
    const recognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!recognition) {
      alert("Sorry, your browser does not support speech recognition.");
      return;
    }

    const speechRecognizer = new recognition();
    speechRecognizer.lang = "en-US";
    speechRecognizer.continuous = false;

    speechRecognizer.onstart = () => {
      setIsListening(true);
    };

    speechRecognizer.onend = () => {
      setIsListening(false);
    };

    speechRecognizer.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserInput((prevInput) => prevInput + transcript);
    };

    speechRecognizer.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    speechRecognizer.start();
  };

  const emotionImages = {
    anger: "/emotions/anger.gif",
    disgust: "/emotions/disgust.gif",
    fear: "/emotions/fear.gif",
    joy: "/emotions/happy.gif",
    neutral: "/emotions/neutral.png",
    sadness: "/emotions/sad.gif",
    surprise: "/emotions/surprise.gif",
  };
  const emotions = Object.keys(emotionImages);

  return (
    <div className=" h-screen flex">
      <div className="w-2/3">
        <div className="flex flex-col h-full items-center justify-center">
          {/* Messages Section */}
          <div className="flex-1 transition duration-700 ease-in-out overflow-y-auto p-4 pt-20">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 p-3 max-w-xs ${
                  message.sender === "user"
                    ? "bg-blue-300 self-start text-left rounded-r-lg"
                    : "bg-response self-end text-right rounded-l-lg"
                }`}
              >
                {message.text}
              </div>
            ))}
            {/* Auto-scroll reference */}
            <div ref={chatEndRef} />
          </div>

          {/* Input Section */}
          <div className="flex items-center p-2 border-t gap-2">
            <Button onPress={handelpreviousmessages} color="primary">
              Pre Chat
            </Button>
            <Input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              placeholder="Type a message..."
              // className="flex-1 p-3 border rounded-l-lg"
            />
            <Button onPress={handleSend} color="primary">
              Send
            </Button>
            <Button
              onPress={handleVoiceInput}
              className={`p-3 rounded-full ${
                isListening ? "bg-red-500" : "bg-gray-500"
              } text-white`}
              title="Hold to speak"
            >
              🎤
            </Button>
            <Button onPress={deletepreviousmessages} color="danger">
              delete
            </Button>
            
          </div>
        </div>
      </div>
      <div className="w-1/3">
        <div>
          {/* <h2>emotion input :- {useremotion}</h2>
          <h1>emotion output :- {botemotion}</h1> */}
          <div className="flex flex-col items-center justify-center min-h-screen">
            {/* Display the Emotion Image */}
            <div className="mb-8">
              <img
                src={emotionImages[botemotion]}
                alt={botemotion}
                className="rounded-lg shadow-lg max-w-sm"
              />
              <p className="mt-4 text-lg font-medium text-amber-50 capitalize">
                Bot Emotion: {botemotion}
              </p>
            </div>

            {/* Buttons to Change Emotion */}
            {/* <div className="flex flex-wrap gap-4 justify-center">
              {emotions.map((emotion) => (
                <Button
                  key={emotion}
                  color={emotion === botemotion ? "primary" : "default"}
                  onPress={() => setbotemotion(emotion)}
                >
                  {emotion}
                </Button>
              ))}
            </div> */}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
