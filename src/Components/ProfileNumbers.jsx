import React from "react";

function ProfileNumbers({ number, title }) {
  return (
    <div className="relative w-[80px] h-12 flex flex-col items-center">
      <p className="text-md">{number}</p>
      <p className="text-xs absolute bottom-0">{title}</p>
    </div>
  );
}

export default ProfileNumbers;
