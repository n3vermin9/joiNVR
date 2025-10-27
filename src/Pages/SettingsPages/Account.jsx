import React from "react";
import CancelBtn from "../../Components/CancelBtn";
import BubbleMessage from "../../Components/BubbleMessage";
import { useNavigate } from "react-router-dom";
import SettingSection from "../../Components/SettingSection";
import { IconCloudX, IconLogout2, IconPassword } from "@tabler/icons-react";

function Account({ showMessage, message }) {
  const navigate = useNavigate();

  return (
    <div className="appear w-screen h-screen flex flex-col items-center gap-8 pt-28 bg-zinc-900 text-white">
      {showMessage && <BubbleMessage message={message} />}
      <CancelBtn onClick={() => navigate("/settings")} />
      <SettingSection
        icon={IconPassword}
        title={"Change password"}
        location={"/changePassword"}
      />
      <SettingSection
        icon={IconLogout2}
        title={"Log out"}
        location={"/logOut"}
      />
      <SettingSection
        icon={IconCloudX}
        title={"Delete account"}
        location={"/deleteAccount"}
      />
    </div>
  );
}

export default Account;
