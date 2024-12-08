import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import axios from "axios";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [useremotion ,setuseremotion] =useState("")
  const [botemotion,setbotemotion] = useState("")

  // Speak the chatbot's response
  const speak = (text) => {
    if (window.responsiveVoice) {
      window.responsiveVoice.speak(text, "UK English Female", {
        rate: 1.15, // Adjust the rate (speed) as needed
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
      const res = await axios.post(
        "https://sqfct8-ip-14-139-226-226.tunnelmole.net/process",
        {
          question: userInput,
        }
      );
      const botResponse = res.data.ai_response;
      console.log("res : ", res);
      // Add bot response to messages
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: botResponse },
      ]);
      setuseremotion(res.data.user_predicted_emotion)
      setbotemotion(res.data.predicted_emotion)
      console.log("user_emotion : ", res.data.user_predicted_emotion);
      console.log("AI_emotion : ", res.data.predicted_emotion);
      // Speak the bot's response
      speak(botResponse); // Speak the response
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

  return (
    <div className="h-screen flex">
      <div className="w-2/3">
        <div className="flex flex-col h-full bg-gray-100 items-center justify-center">
          {/* Messages Section */}
          <div className="flex-1 transition duration-700 ease-in-out overflow-y-auto p-4">
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
          </div>

          {/* Input Section */}
          <div className="flex items-center p-2 border-t">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-3 border rounded-l-lg"
            />
            <Button onClick={handleSend} color="primary">
              Send
            </Button>
            <Button
              onClick={handleVoiceInput}
              className={`p-3 rounded-full ${
                isListening ? "bg-red-500" : "bg-gray-500"
              } text-white`}
              title="Hold to speak"
            >
              🎤
            </Button>
          </div>
        </div>
      </div>
      <div className="w-1/3">
      <h2>emotion input :-  {useremotion}</h2>
      <h1>emotion output :- {botemotion}</h1>
      </div>
    </div>
  );
}
