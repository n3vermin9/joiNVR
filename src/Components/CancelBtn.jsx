import { IconChevronLeft } from "@tabler/icons-react";
import React from "react";

function CancelBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-[60px] h-[60px] absolute left-0 top-0 text-zinc-300 z-20
      flex items-center justify-center"
    >
      <IconChevronLeft className="w-8 h-8"/>
    </button>
  );
}

export default CancelBtn;
