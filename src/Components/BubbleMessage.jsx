import React from "react";

function BubbleMessage({ message}) {
  return (
    <div className="w-[70%] fixed bg-zinc-700 text-white z-20 flex items-center justify-center text-center text-sm rounded-md top-8 px-4 py-4 border border-zinc-500">
      {message}
    </div>
  );
}

export default BubbleMessage;
