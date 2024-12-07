


import { useState } from "react";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);

  // Handle sending messages
  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = `You said: "${input}"`;
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: botResponse },
      ]);
    }, 500);

    setInput("");
  };

  // Handle voice input using the Web Speech API
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
      setInput((prevInput) => prevInput + transcript);
    };

    speechRecognizer.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    speechRecognizer.start();
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 items-center justify-center">
      {/* Messages Section */}
      <div className="flex-1 overflow-y-auto p-4 ">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 p-3 max-w-xs   ${
              message.sender === "user"
                ? "bg-blue-300 self-start text-left rounded-r-lg  "
                : "bg-green-300 self-end text-right rounded-l-lg"
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
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-3 border rounded-l-lg"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded mx-2"
        >
          Send
        </button>
        <button
          onClick={handleVoiceInput}
          className={`p-3 rounded-full ${
            isListening ? "bg-red-500" : "bg-gray-500"
          } text-white`}
          title="Hold to speak"
        >
          🎤
        </button>
      </div>
    </div>
  );
}



