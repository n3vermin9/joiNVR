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
  visitUser,
}) {
  const handleLike = () => {
    const currentUserId = allData["currentUser"].id;
    let updatedAllData = { ...allData };

    for (const [userKey, userData] of Object.entries(allData)) {
      if (!userData.posts) continue;

      const postIndex = userData.posts.findIndex((p) => p.id === post.id);
      if (postIndex === -1) continue;

      const commentIndex = userData.posts[postIndex].comments.findIndex(
        (comm) => comm.id === comment.id
      );
      if (commentIndex === -1) continue;

      const commentLikes =
        userData.posts[postIndex].comments[commentIndex].likes;

      const newLikes = commentLikes.includes(currentUserId)
        ? commentLikes.filter((id) => id !== currentUserId)
        : [...commentLikes, currentUserId];

      allData[userKey].posts[postIndex].comments[commentIndex] = {
        ...allData[userKey].posts[postIndex].comments[commentIndex],
        likes: newLikes,
      };

      break;
    }
    console.log(user);
    console.log(post);

    setAllData(updatedAllData);
    localStorage.setItem("allData", JSON.stringify(updatedAllData));
  };

  return (
    <div
      className="relative w-[95%] min-h-[80px] rounded-md flex items-start justify-center
     gap-5 pl-2 py-2 pr-16  break-all"
    >
      <Pfp
        size={12}
        data={allData}
        name={user?.charAt(0)}
        color={
          allData[user] ? allData[user].color : allData["currentUser"].color
        }
        onClick={() => visitUser(allData[user])}
      />
      <div className="w-[80%]">
        <div className="font-semibold h-8 flex items-center gap-2 ">
          <h1
            onClick={() => visitUser(allData[user])}
            className="
          cursor-pointer text-sm"
          >
            {user}
          </h1>
          {(user === post.user || post.user === undefined) && (
            <p className="bg-zinc-700 w-fit h-5 px-1 font-normal text-[12px] flex items-center justify-center">
              Author
            </p>
          )}
        </div>
        <p className="text-sm pl-1 pr-2 mt-1">{message}</p>
        <p className="text-[12px] mt-4 text-zinc-400 ">{time}</p>
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
