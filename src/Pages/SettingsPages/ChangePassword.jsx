import React from "react";
import Input from "../../Components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import CancelBtn from "../../Components/CancelBtn";
import BubbleMessage from "../../Components/BubbleMessage";

function ChangePassword({
  showMessage,
  message,
  triggerMessage,
  allData,
  setAllData,
}) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirm = () => {
    if (!oldPassword || !newPassword) {
      triggerMessage("Please share the old and new passwords");
      return;
    }
    if (oldPassword !== allData["currentUser"].pass) {
      triggerMessage("The old password is incorrect");
      return;
    }
    if (oldPassword === newPassword) {
      triggerMessage("New password must be different from the old password");
      return;
    }
    if (newPassword.length < 4 || newPassword.length > 18) {
      triggerMessage(
        "Password length must be between 4 and 18 characters long"
      );
      return;
    }
    const newPasswordData = {
      ...allData,
      currentUser: {
        ...allData["currentUser"],
        pass: newPassword,
      },
    };

    setAllData(newPasswordData);
    localStorage.setItem("allData", JSON.stringify(newPasswordData));
    triggerMessage("Password updated successfully");
    navigate("/account");
  };

  return (
    <div className="appear h-screen flex items-center justify-center bg-zinc-900">
      {showMessage && <BubbleMessage message={message} />}
      <CancelBtn onClick={() => navigate("/account")} />
      <div className="h-[450px] w-full flex flex-col items-center gap-4">
        <h1 className="h-24 w-full text-3xl flex font-semibold items-center justify-center text-white">
          Change password
        </h1>
        <Input
          value={oldPassword}
          onChange={handleOldPasswordChange}
          placeholder={"Old password"}
        />
        <Input
          value={newPassword}
          onChange={handleNewPasswordChange}
          placeholder={"New password"}
        />
        <button
          onClick={handleConfirm}
          className="w-[85%] h-[50px] absolute bottom-10 mt-6 rounded-md bg-zinc-600 text-white font-extrabold"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default ChangePassword;
