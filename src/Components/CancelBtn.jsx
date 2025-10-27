import React from "react";

function CancelBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-[90px] h-12 absolute text-lg left-0 top-0 text-zinc-300 z-20"
    >
      Cancel
    </button>
  );
}

export default CancelBtn;
