import React, { useEffect, useRef, useState } from "react";
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
  const inputRef = useRef(null);

  const textLimit = 200;

  const handleInput = (e) => {
    let value = e.target.value;
    if (value.length > textLimit) {
      value = value.substring(0, textLimit);
    }
    setInputValue(value);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handlePost = () => {
    if (!inputValue) return;
    const date = new Date();
    const mm = String(date.getMinutes()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const mo = String(date.getMonth() + 1).padStart(2, "0");
    const yy = String(date.getFullYear()).slice(-2);

    const months = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ];

    const time = `${hh}:${mm}, ${months[parseInt(mo - 1)]} ${dd}`;

    let newPost = {
      id: Date.now(),
      time: time,
      post: `${inputValue}`,
      likes: [],
      comments: [],
    };

    const updatedPosts = [...allData["currentUser"].posts, newPost];

    let newAllData = {
      ...allData,
      ["currentUser"]: {
        ...allData["currentUser"],
        posts: updatedPosts,
      },
    };

    // const notificationId = `${allData["currentUser"].id}_${Date.now()}`;

    // const newNotification = {
    //   id: notificationId,
    //   user: allData["currentUser"].name,
    //   notification: `posted`,
    //   link: Date.now(),
    //   icon: "post",
    //   time: time,
    //   unread: true,
    // };

    // const followerIds = Object.values(allData)
    //   .filter((user) => allData["currentUser"].followers.includes(user.id))
    //   .map((user) => user.id);

    // followerIds.forEach((followerId) => {
    //   const followerData = allData[followerId];
    //   if (followerData) {
    //     const updatedInbox = [...followerData.inbox, newNotification];

    //     newAllData = {
    //       ...newAllData,
    //       [followerId]: {
    //         ...followerData,
    //         inbox: updatedInbox,
    //       },
    //     };
    //   }
    // });

    setAllData(newAllData);
    localStorage.setItem("allData", JSON.stringify(newAllData));

    setNavOffset(0);

    navigate("/");
  };

  const handleKeyDown = (e) => {
    console.log("Key pressed:", e.key);
    if (e.key === "Enter") {
      handlePost();
    }
  };
  return (
    <>
      <div
        className="appear w-full h-screen flex flex-col items-center justify-center
       bg-zinc-900 text-white pb-40"
      >
        {showMessage && <BubbleMessage message={message} />}
        <div className="w-[85%] h-[400px] flex flex-col items-center">
          <h1 className="w-full h-14 text-2xl font-semibold">New post</h1>
          <textarea
            className="w-[100%] flex bg-[#131315] border rounded-md p-4 outline-none
             border-zinc-500 resize-y min-h-[40px] break-words pb-4"
            placeholder="Share your thoughts"
            value={inputValue}
            ref={inputRef}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            rows={10}
          />
          <p
            className="w-[95%] h-10 flex items-center justify-end pr-2 text-zinc-500
           font-semibold text-sm"
          >
            {textLimit - inputValue.length}
          </p>
        </div>
        <button
          onClick={handlePost}
          className="w-[85%] h-[50px] mb-10 rounded-md bg-zinc-600 text-white
           font-extrabold"
        >
          Post
        </button>
      </div>
      <NavBar navOffset={navOffset} setNavOffset={setNavOffset} />
    </>
  );
}

export default Post;
