import React, { useEffect, useState } from "react";
import pfp from "../images/pfp.jpg";

function Pfp({ size, data, name, color}) {
  
  let backgroundColor;

  if (color) {
    backgroundColor = color
  } else if (name === data.currentUser?.name) {
    backgroundColor = data.currentUser.color;

  } else {
    const foundUser = Object.values(data).find((user) => user.name === name);
    backgroundColor = foundUser ? foundUser.color : data.currentUser.color;
  }

  return (
    // <img
    //   src={pfp}
    //   alt="pfp"
    //   className={`w-${size} aspect-square rounded-full border-2 p-1`}
    // />
    <div
      className={`w-${size} aspect-square 
      rounded-full border-2 border-zinc-400 text-[${size}px] bg-[${backgroundColor}] font-semibold flex items-center justify-center`}
    >
      {name.charAt(0)}
    </div>
  );
}

export default Pfp;
