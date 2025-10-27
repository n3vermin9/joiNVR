import React from "react";
import Pfp from "./Pfp";
import { IconChevronRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

function UserCard({ allData, user, initial, visitedUser, setVisitedUser }) {
  const navigate = useNavigate();

  const visitUser = () => {
    navigate("/visitProfile");
    setVisitedUser(allData[user]);
  };

  return (
    <div
      onClick={() => visitUser()}
      className="up w-[86%] h-[70px] border border-zinc-600
     bg-zinc-800/40 rounded-md flex items-center gap-5 px-3"
    >
      <Pfp
        size={12}
        data={allData}
        name={initial}
        color={allData[user].color}
      />
      <h1>{user}</h1>
      <IconChevronRight className="absolute right-3" />
    </div>
  );
}

export default UserCard;
