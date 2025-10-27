import React, { useState } from "react";
import BubbleMessage from "../Components/BubbleMessage";
import NavBar from "../Components/NavBar";
import { useNavigate } from "react-router-dom";
import Input from "../Components/Input";

function Post({
  showMessage,
  message,
  allData,
  setAllData,
  navOffset,
  setNavOffset,
}) {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const textLimit = 200;

  const handleInput = (e) => {
    let value = e.target.value;
    if (value.length > textLimit) {
      value = value.substring(0, textLimit);
    }
    setInputValue(value);
  };

  const handlePost = () => {
    if (!inputValue) return;
    const time = Date.now();
    const date = new Date(time).toLocaleString();

    let newPost = {
      id: time,
      time: date,
      post: `${inputValue}`,
      likes: [],
    };

    const updatedPosts = [...allData["currentUser"].posts, newPost];

    const newAllData = {
      ...allData,
      ["currentUser"]: {
        ...allData["currentUser"],
        posts: updatedPosts,
      },
    };

    setAllData(newAllData);
    localStorage.setItem("allData", JSON.stringify(newAllData));

    setNavOffset(0);

    navigate("/");
  };

  return (
    <>
      <div className="appear w-full h-screen flex flex-col items-center justify-center bg-zinc-900 text-white pb-40">
        {showMessage && <BubbleMessage message={message} />}
        <div className="w-[85%] h-[400px] flex flex-col items-center">
          <h1 className="w-full h-14 text-2xl font-semibold">New post</h1>
          <textarea
            className="w-[100%] flex bg-[#131315] border rounded-md p-4 outline-none border-zinc-500 resize-y min-h-[40px] break-words pb-4"
            placeholder="Share your thoughts"
            value={inputValue}
            onChange={handleInput}
            rows={10}
          />
          <p className="w-[95%] h-10 flex items-center justify-end pr-2 text-zinc-500 font-semibold text-sm">
            {textLimit - inputValue.length}
          </p>
        </div>
        <button
          onClick={handlePost}
          className="w-[85%] h-[50px] mb-10 rounded-md bg-zinc-600 text-white font-extrabold"
        >
          Post
        </button>
      </div>
      <NavBar navOffset={navOffset} setNavOffset={setNavOffset} />
    </>
  );
}

export default Post;
