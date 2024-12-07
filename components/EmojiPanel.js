export default function EmojiPanel() {
    const emojis = ["😀", "😂", "😍", "😎", "❤️"];
    return (
      <div className="flex flex-wrap justify-center items-center bg-gray-200 h-full p-4">
        {emojis.map((emoji, index) => (
          <span key={index} className="text-4xl m-2 cursor-pointer">
            {emoji}
          </span>
        ))}
      </div>
    );
  }


