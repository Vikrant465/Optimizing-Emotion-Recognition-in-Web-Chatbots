import axios from "axios";
import { useState } from "react";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/process", {
        question: userInput,
      });
      setResponse(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="home bg-a flex items-center h-screen justify-around">
        <div className="">
        <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
        />
        <button color="primary" onClick={handleSubmit}>
            Submit
        </button>
        {response && (
            <div>
            <p>AI Response: {response.ai_response}</p>
            {/* <p>Emotion: {response.predicted_emotion}</p> */}
            </div>
        )}
        </div>
    </div>
  );
};

export default Home;


