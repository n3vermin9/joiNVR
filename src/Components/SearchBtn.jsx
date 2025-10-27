import { IconSearch, IconX } from "@tabler/icons-react";
import React from "react";

function SearchBtn({ onClick, isSearch }) {
  return (
    <button
      onClick={() => onClick()}
      className="absolute w-8 aspect-square left-3 top-3 z-20"
    >
      {isSearch ? (
        <IconX stroke={2} className="w-full h-full" />
      ) : (
        <IconSearch stroke={2} className="w-full h-full" />
      )}
    </button>
  );
}

export default SearchBtn;
