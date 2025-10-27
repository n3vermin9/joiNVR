import React from "react";
import CancelBtn from "../../Components/CancelBtn";
import { useNavigate } from "react-router-dom";
import Pfp from "../../Components/Pfp";

function LogOut({ showMessage, message, allData, setAllData }) {
  const navigate = useNavigate();

  const handleLogOut = () => {
    const newKey = allData.currentUser.name

    const newData = {
      ...allData,
      [newKey]: allData.currentUser,
    };
    delete newData.currentUser;

    setAllData(newData);
    localStorage.setItem("allData", JSON.stringify(newData));
    navigate("/logIn");
  };

  return (
    <div className="appear w-screen h-screen flex flex-col items-center justify-center bg-zinc-900 text-white">
      {showMessage && <BubbleMessage message={message} />}
      <CancelBtn onClick={() => navigate("/account")} />
      <div className="flex flex-col items-center gap-4 justify-center mb-40">
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
        <h1 className="w-[80%] mt-10 text-xl text-center">
          Are you sure you want to log out of your account?
        </h1>
      </div>
      <button
        onClick={handleLogOut}
        className="w-[85%] h-[50px] absolute bottom-10 mt-6 rounded-md bg-zinc-600 text-white font-extrabold"
      >
        Confirm
      </button>
    </div>
  );
}

export default LogOut;
