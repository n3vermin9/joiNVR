import React, { useState } from "react";
import Input from "../Components/Input";
import BubbleMessage from "../Components/BubbleMessage";
import { Link, useNavigate } from "react-router-dom";

function SignUp({
  triggerMessage,
  showMessage,
  setShowMessage,
  message,
  allData,
  setAllData,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameTaken, setUsernameTaken] = useState(false);

  const pfpColors = [
    "#0088cc", // blue
    "#00a884", // Greenish
    "#f2a900", // Yellow/orange
    "#e40017", // Red
    "#3b5998", // Dark blue
    "#34a853", // Green
    "#fbbc05", // Orange
    "#4285f4", // Blue
  ];

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUp = () => {
    if (showMessage) return;
    // username password checks
    if (username.length < 4 || username.length > 18) {
      triggerMessage(
        "Username length must be between 4 and 18 characters long"
      );
      return;
    }
    if (password.length < 4 || password.length > 18) {
      triggerMessage(
        "Password length must be between 4 and 18 characters long"
      );
      return;
    }
    if (username.length == 0 || password.length == 0) {
      triggerMessage("Username or password is empty");
      return;
    }
    // username password checks

    if (allData) {
      const keys = Object.keys(allData);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (key.startsWith(username)) {
          setUsernameTaken(true);
          triggerMessage("Username is already taken");
          console.log(1);
          setUsernameTaken(false);
          return;
        }
      }
    }
    // Create new account
    let randomId = Math.floor(Math.random() * 10000);
    let data = {
      id: randomId,
      name: username,
      pass: password,
      bio: "",
      color: pfpColors[Math.floor(Math.random() * pfpColors.length)],
      posts: [],
    };
    const updatedAllData = {
      ...allData,
      [username]: data,
    };
    // console.log(updatedAllData);

    setAllData(updatedAllData);
    localStorage.setItem("allData", JSON.stringify(updatedAllData));
    navigate("/logIn");
  };
  // console.log(allData[`${username}_${password}`].posts[0].id);

  return (
    <div className="h-screen flex items-center justify-center bg-zinc-900">
      {showMessage && <BubbleMessage message={message} />}
      <div className="h-[450px] w-full flex flex-col items-center gap-4">
        <h1 className="h-24 w-full text-4xl flex font-semibold items-center justify-center text-white">
          JoiNVR
        </h1>
        <Input
          value={username}
          onChange={handleUsernameChange}
          placeholder={"Username"}
        />
        <Input
          value={password}
          onChange={handlePasswordChange}
          placeholder={"Password"}
        />
        <button
          onClick={handleSignUp}
          className="w-[85%] h-[50px] mt-6 rounded-md bg-zinc-600 text-white font-extrabold"
        >
          Sign up
        </button>
      </div>
      <p className="absolute bottom-8 text-white">
        Don't have an account?
        <Link to="/logIn" className="text-blue-400">
          {" "}
          Log in.
        </Link>
      </p>
    </div>
  );
}

export default SignUp;
