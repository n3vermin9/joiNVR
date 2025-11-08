import React, { useState } from "react";
import Pfp from "../Components/Pfp";
import Input from "../Components/Input";
import BubbleMessage from "../Components/BubbleMessage";
import EditProfileInput from "../Components/EditProfileInput";
import { useNavigate } from "react-router-dom";
import CancelBtn from "../Components/CancelBtn";

function EditProfile({
  allData,
  setAllData,
  showMessage,
  triggerMessage,
  setShowMessage,
  message,
  onProfileUpdate,
}) {
  const [username, setUsername] = useState(allData["currentUser"].name);
  const [bio, setBio] = useState(allData["currentUser"].bio);
  const [usernameTaken, setUsernameTaken] = useState(false);

  const users = Object.values(allData).flatMap((user) => user.name || "");

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleSaveChanges = () => {
    if (showMessage) return;
    // username checks
    if (username.length <= 3 || username.length > 18) {
      triggerMessage(
        "Username length must be between 4 and 18 characters long"
      );
      return;
    }

    if (username.length == 0) {
      triggerMessage("Username is empty");
      return;
    }

    if (bio.length >= 60) {
      triggerMessage("Bio can be up to 60 characters only");
      return;
    }

    if (
      users.find(
        (name) => name == username && username !== allData["currentUser"].name
      )
    ) {
      triggerMessage("Username is already taken");
    } else {
      const newAllData = {
        ...allData,
        currentUser: {
          ...allData["currentUser"],
          name: username,
          bio: bio,
        },
      };

      setAllData(newAllData);
      localStorage.setItem("allData", JSON.stringify(newAllData));

      if (onProfileUpdate) {
        onProfileUpdate("Profile updated successfully");
      }
      navigate("/");
    }
  };

  return (
    <div className="appear w-full h-screen flex flex-col items-center gap-10 bg-zinc-900 text-white">
      {showMessage && <BubbleMessage message={message} />}
      <CancelBtn onClick={() => navigate("/")} />
      <div className="relative rounded-md w-[100%] pt-4 mt-10 flex flex-col gap-4 items-center justify-center px-2">
        <div className="flex flex-col items-center justify-center gap-2">
          <Pfp
            size={36}
            data={allData}
            name={allData[`currentUser`].name.charAt(0)}
          />
        </div>
        <div className="w-[90%] flex flex-col items-center justify-center gap-4 py-8">
          <EditProfileInput
            title={"Name"}
            value={username}
            onChange={handleUsernameChange}
          />
          <EditProfileInput
            title={"Bio"}
            value={bio}
            onChange={handleBioChange}
          />
        </div>
      </div>
      <button
        onClick={handleSaveChanges}
        className="w-[360px] h-12 bg-zinc-600 text-white text-md font-extrabold rounded absolute bottom-10"
      >
        Save changes
      </button>
    </div>
  );
}

export default EditProfile;
