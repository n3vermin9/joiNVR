import React from "react";

function ProfileNumbers({ number, title, onClick }) {
  return (
    <div
      onClick={onClick}
      className="relative w-[80px] h-12 cursor-pointer flex flex-col items-center"
    >
      <p className="text-md">{number}</p>
      <p className="text-xs absolute bottom-0">{title}</p>
    </div>
  );
}

export default ProfileNumbers;
