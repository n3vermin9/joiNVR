import React from "react";
import Pfp from "./Pfp";
import { IconDots, IconHeart, IconHeartFilled } from "@tabler/icons-react";

function PostDiv({ user, post, handleMore, allData, setAllData }) {
  const handleLike = () => {
    const postAuthor = allData[user] ? user : "currentUser";
    const thisPostAuthor = allData[postAuthor];

    const updatedLikes = post.likes.includes(allData["currentUser"].id)
      ? post.likes.filter((like) => like !== allData["currentUser"].id)
      : [...post.likes, allData["currentUser"].id];

    const newAllData = {
      ...allData,
      [postAuthor]: {
        ...thisPostAuthor,
        posts: thisPostAuthor.posts.map((p) =>
          p.id === post.id ? { ...p, likes: updatedLikes } : p
        ),
      },
    };

    setAllData(newAllData);
    localStorage.setItem("allData", JSON.stringify(newAllData));
  };

  return (
    <div
      className="appear w-[92%] border border-zinc-600 bg-zinc-800/40 rounded-md
     min-h-[150px] flex flex-col justify-between gap-1"
    >
      <div
        className="border-b border-b-zinc-700 h-[70px] flex items-center justify-between
       px-3"
      >
        <Pfp size={12} data={allData} name={user} />
        <h1>{user}</h1>
        <button onClick={() => console.log(post.likes)}>
          <IconDots className="w-8 h-8" />
        </button>
      </div>
      <p className="min-h-[50px] break-all w-full flex items-center px-4">
        {post.post}
      </p>
      <div className="h-11  flex items-center justify-between text-[13px] text-zinc-300 px-4">
        <div className="w-fit h-10 flex items-center justify-start gap-1">
          <button onClick={() => handleLike()}>
            {!post.likes.includes(allData["currentUser"].id) ? (
              <IconHeart className="w-5 h-5" />
            ) : (
              <IconHeartFilled className="w-5 h-5 text-red-600" />
            )}
          </button>
          <p className="text-[17px] flex items-center justify-center mt-[2px]">
            {post.likes.length}
          </p>
        </div>
        <p className="h-10 flex items-center justify-end text-[13px] text-zinc-300">
          {post.time}
        </p>
      </div>
    </div>
  );
}

export default PostDiv;
