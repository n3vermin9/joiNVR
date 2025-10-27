import React from "react";
import BubbleMessage from "../Components/BubbleMessage";
import CancelBtn from "../Components/CancelBtn";
import { Navigate, useNavigate } from "react-router-dom";
import SettingSection from "../Components/SettingSection";
import { IconUser } from "@tabler/icons-react";

function Settings({ showMessage, message }) {
  const navigate = useNavigate();

  return (
    <div className="appear w-screen h-screen flex flex-col items-center gap-8 pt-28 bg-zinc-900 text-white">
      {showMessage && <BubbleMessage message={message} />}
      <CancelBtn onClick={() => navigate("/")} />
      <SettingSection icon={IconUser} title={"Account"} location={'/account'}/>
    </div>
  );
}

export default Settings;
