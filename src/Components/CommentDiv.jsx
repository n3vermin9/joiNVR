import { IconDots, IconHeart, IconHeartFilled } from "@tabler/icons-react";
import React from "react";
import Pfp from "./Pfp";

function CommentDiv({
  comment,
  user,
  allData,
  time,
  message,
  setAllData,
  post,
}) {
  const handleLike = () => {
    const postAuthor = allData[user] ? user : "currentUser";
    const thisPostAuthor = allData[postAuthor];

    const updatedLikes = comment.likes.includes(allData["currentUser"].id)
      ? comment.likes.filter((like) => like !== allData["currentUser"].id)
      : [...comment.likes, allData["currentUser"].id];

    const newAllData = {
      ...allData,
      [postAuthor]: {
        ...thisPostAuthor,
        posts: thisPostAuthor.posts.map((p) =>
          p.id === post.id
            ? {
                ...p,
                comments: p.comments.map((comm) =>
                  comm.id === comment.id
                    ? { ...comment, likes: updatedLikes }
                    : comm
                ),
              }
            : p
        ),
      },
    };
    console.log(comment.likes)

    setAllData(newAllData);
    localStorage.setItem("allData", JSON.stringify(newAllData));
  };

  return (
    <div
      className="relative w-[95%] min-h-[80px] rounded-md flex items-start justify-center
     gap-5 pl-2 py-2 pr-16  break-all"
    >
      <Pfp
        size={12}
        data={allData}
        name={user.charAt(0)}
        color={
          allData[user] ? allData[user].color : allData["currentUser"].color
        }
      />
      <div className="w-[80%] ">
        <h1 className="font-semibold ">{user}</h1>
        <p className="text-sm pl-1 pr-2 mt-1">{message}</p>
        <p className="text-[12px] mt-4 text-zinc-400">{time}</p>
      </div>
      <div
        className="absolute right-5 top-2 flex items-center
      justify-center flex-col"
      >
        {/* <IconDots className="" /> */}
        <button className="mt-2" onClick={() => handleLike()}>
          {!comment.likes?.includes(allData["currentUser"].id) ? (
            <IconHeart className="w-5 h-5" />
          ) : (
            <IconHeartFilled className="w-5 h-5 text-red-600" />
          )}
        </button>
        <p className="text-sm mt-1">{comment.likes?.length}</p>
      </div>
    </div>
  );
}

export default CommentDiv;
