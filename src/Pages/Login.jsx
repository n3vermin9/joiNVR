import React, { useEffect, useState } from "react";
import Input from "../Components/Input";
import BubbleMessage from "../Components/BubbleMessage";
import { Link, useNavigate } from "react-router-dom";

function Login({
  triggerMessage,
  showMessage,
  setShowMessage,
  message,
  allData,
  setAllData,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogIn = () => {
    if (showMessage) return;
    if (username.length === 0 || password.length === 0) {
      triggerMessage("Username or password is empty");
      return;
    }
    if (!allData) {
      triggerMessage("Username or password is invalid");
      return;
    }
    if (allData[username]?.pass !== password) {
      triggerMessage("Username or password is invalid");
      return;
    }
    if (allData[username] == null) {
      triggerMessage("Username or password is invalid");
      return;
    }
    allData["currentUser"] = allData[username];

    delete allData[username];

    localStorage.setItem("allData", JSON.stringify(allData));

    navigate("/");
  };

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
        <div className="w-[85%] flex justify-end">
          <button className="w-[145px] flex justify-end text-blue-400">
            Forgot password?
          </button>
        </div>
        <button
          onClick={() => handleLogIn(username)}
          className="w-[85%] h-[50px] mt-6 rounded-md bg-zinc-600 text-white font-extrabold"
        >
          Log in
        </button>
      </div>
      <p className="absolute bottom-8 text-white">
        Don't have an account?
        <Link to="/signUp" className="text-blue-400">
          {" "}
          Sign up.
        </Link>
      </p>
    </div>
  );
}

export default Login;
