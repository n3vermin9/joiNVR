import { IconNotesOff } from "@tabler/icons-react";
import React from "react";

function NoPosts({ title }) {
  return (
    <div className="w-[250px] aspect-square flex flex-col gap-4 items-center justify-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <IconNotesOff className="w-[100px] h-[100px] text-zinc-600" />
      <p className="text-lg h-[40px] flex items-center text-zinc-300">
        {title}
      </p>
    </div>
  );
}

export default NoPosts;
