import {
  IconChevronRight,
  IconHeart,
  IconMessage,
  IconNotes,
  IconUser,
} from "@tabler/icons-react";
import React from "react";

function NotificationDiv({ user, notification, unread, link, icon }) {
  return (
    <div
      className="up w-[86%] min-h-[70px] border border-zinc-600
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
        <button className="font-semibold mr-1">{user}</button>
        {notification}
      </p>
      <IconChevronRight className="absolute right-3" />
    </div>
  );
}

export default NotificationDiv;
