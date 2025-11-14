import { IconBell } from "@tabler/icons-react";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

function InboxBtn({ allData }) {
  const navigate = useNavigate();

  const notificationsCount = allData["currentUser"].inbox.filter(
    (obj) => obj.unread === true
  ).length;
  
  return (
    <button
      onClick={() => navigate("/inbox")}
      className="absolute w-8 aspect-square left-3 top-3 z-20"
    >
      <IconBell stroke={2} className="w-full h-full" />
      {notificationsCount > 0 && (
        <div
          className={`absolute -right-3 border-2 border-zinc-900
       -top-2 w-7 h-7 bg-zinc-600 rounded-full
      flex items-center justify-center ${
        notificationsCount < 9 ? "text-[10px]" : "text-[13px]"
      }`}
        >
          {notificationsCount < 100 ? notificationsCount : "99+"}
        </div>
      )}
    </button>
  );
}

export default InboxBtn;
