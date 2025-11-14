import {
  IconChevronRight,
  IconHeart,
  IconMessage,
  IconNotes,
  IconUser,
} from "@tabler/icons-react";
import React from "react";
import { useNavigate } from "react-router-dom";

function NotificationDiv({
  user,
  notification,
  unread,
  link,
  time,
  icon,
  allData,
  visitUser,
}) {
  const navigate = useNavigate();

  const handleOpen = () => {
    switch (icon) {
      case "person":
        visitUser(allData[user]);
        break;
      default:
        navigate("/comments", { state: { post: link, user } });
        break;
    }
  };
  return (
    <div
      onClick={() => handleOpen()}
      className="up w-[86%] min-h-[80px] border border-zinc-600 cursor-pointer
     bg-zinc-800/40 rounded-md flex items-center gap-4 px-3 py-3 overflow-auto"
    >
      {unread && (
        <div className="w-[6px] h-[5px] bg-blue-600 absolute left-1 top-1 rounded-full"></div>
      )}
      {icon == "post" ? (
        <IconNotes />
      ) : icon == "like" ? (
        <IconHeart />
      ) : icon == "comment" ? (
        <IconMessage />
      ) : (
        icon == "person" && <IconUser />
      )}
      <p className="text-md w-[75%]">
        <button
          onClick={(e) => {
            e.stopPropagation();
            visitUser(allData[user]);
          }}
          className="font-semibold mr-1"
        >
          {user}
        </button>
        {notification}
        <p className="text-[11px] text-zinc-400">{time}</p>
      </p>
      <IconChevronRight className="absolute right-3" />
    </div>
  );
}

export default NotificationDiv;
