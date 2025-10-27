import { IconSettings } from "@tabler/icons-react";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

function SettingsBtn() {

  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/settings")}
      className="absolute w-8 aspect-square right-3 top-3 z-20"
    >
      <IconSettings stroke={2} className="w-full h-full" />
    </button>
  );
}

export default SettingsBtn;
