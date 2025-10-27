import React from "react";
import NavBarBtn from "./NavBarBtn";
import { IconHome, IconPlus, IconUser } from "@tabler/icons-react";

function NavBar({ navOffset, setNavOffset }) {
  return (
    <div
      className="h-[80px] w-[60%] fixed bottom-6 left-1/2
     transform -translate-x-1/2 gap-1 rounded-full overflow-hidden
      border-2 border-zinc-600/60 text-white bg-zinc-800
       flex items-center justify-around z-50 px-2"
    >
      <NavBarBtn
        icon={IconHome}
        path={"/fyp"}
        offset={187}
        navOffset={navOffset}
        setNavOffset={setNavOffset}
      />
      <NavBarBtn
        icon={IconPlus}
        path={"/post"}
        offset={93}
        navOffset={navOffset}
        setNavOffset={setNavOffset}
      />
      <NavBarBtn
        icon={IconUser}
        path={"/"}
        offset={0}
        navOffset={navOffset}
        setNavOffset={setNavOffset}
      />
      <div
        style={{
          transform: `translateX(-${navOffset}%)`,
        }}
        className="border border-zinc-500/50 border-t-zinc-400/70 border-r-zinc-300/60
        border-b-zinc-400/60
         absolute right-[2.5%] h-[85%]
         rounded-full w-[33%] bg-gradient-to-t from-zinc-900 via-zinc-800
          to-zinc-700 will-change-transform transition-transform"
      ></div>
    </div>
  );
}

export default NavBar;
