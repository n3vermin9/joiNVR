import React from "react";
import CancelBtn from "../../Components/CancelBtn";
import BubbleMessage from "../../Components/BubbleMessage";
import { useNavigate } from "react-router-dom";
import SettingSection from "../../Components/SettingSection";
import { IconPassword } from "@tabler/icons-react";
import Pfp from "../../Components/Pfp";

function DeleteAccount({ showMessage, message, allData, setAllData }) {
  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    const newData = {
      ...allData,
    };
    delete newData.currentUser;

    setAllData(newData);
    localStorage.setItem("allData", JSON.stringify(newData));
    navigate("/logIn");
  };

  return (
    <div className="appear w-screen h-screen flex flex-col items-center justify-around gap-8 pt-28 bg-zinc-900 text-white">
      {showMessage && <BubbleMessage message={message} />}
      <CancelBtn onClick={() => navigate("/account")} />
      <div className="flex flex-col items-center gap-4 justify-center mb-[50vh]">
        <div className="flex flex-col items-center justify-center gap-2">
          <Pfp
            size={36}
            data={allData}
            name={allData[`currentUser`].name.charAt(0)}
          />
        </div>
        <h1 className="w-[80%] text-xl text-center">
          {allData[`currentUser`].name}
        </h1>
        <div className="w-[80%] h-1/2 mt-4 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold text-center">
            Are you sure you want to delete your account?
          </h1>
          <p className="h-32 text-center flex items-center">
            All your account information will be permanently removed
          </p>
        </div>
      </div>
      <button
        onClick={handleDeleteAccount}
        className="w-[85%] h-[50px] absolute bottom-10 mt-6 rounded-md bg-zinc-600 text-white font-extrabold"
      >
        Confirm
      </button>
    </div>
  );
}

export default DeleteAccount;
