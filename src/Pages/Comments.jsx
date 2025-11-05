import React, { useEffect, useRef, useState } from "react";
import CancelBtn from "../Components/CancelBtn";
import { useLocation, useNavigate } from "react-router-dom";
import Pfp from "../Components/Pfp";
import { IconArrowUp, IconDots } from "@tabler/icons-react";
import CommentDiv from "../Components/CommentDiv";
import Input from "../Components/Input";
import NoPosts from "../Components/NoPosts";

function Comments({
  message,
  showMessage,
  allData,
  setAllData,
  user,
  visitedUser,
  setVisitedUser,
  visitUser,
}) {
  const [inputValue, setInputValue] = useState("");
  const debounceRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const { post } = location.state || {};

  // const visitUser = () => {
  //   navigate("/visitProfile");
  //   setVisitedUser();
  // };

  const [currentPost, setCurrentPost] = useState(post);

  useEffect(() => {
    if (post && allData) {
      const userPosts = Object.values(allData).flatMap(
        (user) => user.posts || []
      );
      const updatedPost = userPosts.find((p) => p.id === post.id);
      if (updatedPost) {
        setCurrentPost(updatedPost);
      }
    }
  }, [allData, post?.id]);

  const textLimit = 60;

  const handleInputChange = (e) => {
    let value = e.target.value;
    if (value.length > textLimit) {
      value = value.substring(0, textLimit);
    }
    setInputValue(value);

    // Debounce
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      console.log("Processed input:", value);
    }, 300);
  };

  const handleComment = ({ postId, message }) => {
    if (!inputValue) return;

    const time = Date.now();
    const date = new Date(time).toLocaleString();

    const updatedData = { ...allData };
    const userPosts = Object.values(updatedData).flatMap(
      (user) => user.posts || []
    );
    userPosts.forEach((post) => {
      if (post.id === postId) {
        if (!post.comments) post.comments = [];
        post.comments.push({
          id: time,
          name: allData["currentUser"].name,
          message,
          time: date,
          likes: [],
        });
      }
    });
    console.log(allData["currentUser"].name);
    setAllData(updatedData);
    localStorage.setItem("allData", JSON.stringify(updatedData));
  };

  const displayComments = () => {
    if (currentPost.comments.length) {
      return currentPost.comments
        .slice()
        .reverse()
        .map((comment, index) => (
          <CommentDiv
            key={index}
            comment={comment}
            message={comment.message}
            user={comment.name}
            allData={allData}
            time={comment.time}
            likes={comment.likes}
            setAllData={setAllData}
            post={post}
            visitUser={visitUser}
          />
        ));
    } else {
      return <NoPosts title={"No comments"} />;
    }
  };

  return (
    <>
      <div
        className="appear w-full min-h-screen relative h-full flex flex-col gap-4
       overflow-y-scroll items-center bg-zinc-900 text-white pb-[130px]"
      >
        {showMessage && <BubbleMessage message={message} />}
        <CancelBtn onClick={() => navigate(-1)} />
        <div className="w-full mt-[80px] border-b border-zinc-700 px-2 flex flex-col gap-4">
          <div
            onClick={() => visitUser(allData[post.user])}
            className="flex items-center px-2 "
          >
            <Pfp
              size={8}
              data={allData}
              name={
                post.user
                  ? post.user.charAt(0)
                  : allData["currentUser"].name.charAt(0)
              }
              color={allData[post.user]?.color}
            />
            <p className="min-h-[20px] w-fit cursor-pointer flex items-center px-2 font-semibold">
              {post.user ? post.user : allData["currentUser"].name}
            </p>
          </div>
          <p className="min-h-[50px]  break-all w-full flex px-4 py-2">
            {currentPost.post}
          </p>
          <div className="h-8 flex items-center justify-between px-2">
            <p>{currentPost.likes.length} likes</p>
            <p className="h-10 flex items-center justify-end text-[13px] text-zinc-300">
              {currentPost.time}
            </p>
          </div>
        </div>
        <div
          className="w-full mt-[5px] flex flex-col items-center justify-center
      gap-4"
        >
          <p className="">{currentPost.comments.length} comments</p>
          {displayComments()}
        </div>
      </div>
      <div
        className="w-full h-[100px] flex items-center justify-center
      gap-4 px-6 fixed bottom-2 left-1/2 transform -translate-x-1/2 z-50 text-white"
      >
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder={"Comment..."}
          classes={
            "up bg-zinc-800 w-[80%] border border-zinc-600 text-white rounded-[50px]"
          }
        />
        <button
          onClick={() => {
            handleComment({
              postId: currentPost.id,
              message: inputValue,
            });
            setInputValue("");
          }}
          className="up bg-zinc-700 rounded-full h-1/2 aspect-square flex items-center justify-center border border-zinc-500"
        >
          <IconArrowUp />
        </button>
      </div>
    </>
  );
}

export default Comments;
