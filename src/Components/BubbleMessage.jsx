import React, { useEffect, useState } from "react";

function BubbleMessage({ message }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`w-[70%] fixed bg-zinc-700 text-white z-20 flex items-center
         justify-center text-center text-sm rounded-[100px] top-8 px-4 py-4 border
          border-zinc-500 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {message}
    </div>
  );
}

export default BubbleMessage;
