import React from "react";
import Pfp from "./Pfp";
import {
  IconBookmark,
  IconHeart,
  IconHeartFilled,
  IconMessage,
  IconTrash,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

function PostDiv({
  user,
  post,
  allData,
  setAllData,
  visitUser,
  triggerMessage,
}) {
  const navigate = useNavigate();

  const postAuthor = allData[user] ? user : "currentUser";
  const handleLike = () => {
    const thisPostAuthor = allData[postAuthor];
    const isLiked = post.likes.includes(allData["currentUser"].id);
    const updatedLikes = isLiked
      ? post.likes.filter((like) => like !== allData["currentUser"].id)
      : [...post.likes, allData["currentUser"].id];

    const date = new Date();
    const mm = String(date.getMinutes()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const mo = String(date.getMonth() + 1).padStart(2, "0");
    const yy = String(date.getFullYear()).slice(-2);

    const time = `${hh}:${mm}, ${dd}.${mo}.${yy}`;
    
    let updatedInbox;

    const notificationId = `${allData["currentUser"].id}_${post.id}`;

    if (allData[postAuthor].name !== allData["currentUser"].name) {
      const newNotification = {
        id: notificationId,
        user: allData["currentUser"].name,
        notification: "liked your post",
        link: post,
        icon: "like",
        time: time,
        unread: true,
      };

      updatedInbox = [...allData[postAuthor].inbox];

      if (isLiked) {
        updatedInbox = updatedInbox.filter(
          (notif) => notif.id !== notificationId
        );
      } else {
        updatedInbox.push(newNotification);
      }
    }

    const newAllData = {
      ...allData,
      [postAuthor]: {
        ...thisPostAuthor,
        posts: thisPostAuthor.posts.map((p) =>
          p.id === post.id ? { ...p, likes: updatedLikes } : p
        ),
        ...(allData[postAuthor].name !== allData["currentUser"].name && {
          inbox: updatedInbox,
        }),
      },
    };

    setAllData(newAllData);
    localStorage.setItem("allData", JSON.stringify(newAllData));
  };

  const handleMore = (id) => {
    if (allData[user]) return;
    const updatedPostsData = allData["currentUser"].posts.filter(
      (item) => item.id !== id
    );
    const newAllData = {
      ...allData,
      ["currentUser"]: {
        ...allData["currentUser"],
        posts: updatedPostsData,
      },
    };
    triggerMessage("Post removed");
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
        <Pfp
          size={12}
          data={allData}
          name={user}
          onClick={() => visitUser(allData[user])}
        />
        <h1 onClick={() => visitUser(allData[user])} className="cursor-pointer">
          {user}
        </h1>
        <button onClick={() => handleMore(post.id)}>
          {allData[user] ? <IconBookmark /> : <IconTrash className="w-6 h-6" />}
        </button>
      </div>
      <p className="min-h-[50px] break-all w-full flex items-center px-4">
        {post.post}
      </p>
      <div className="h-11  flex items-center justify-between text-[13px] text-zinc-300 px-4">
        <div className="w-fit h-10 flex items-center justify-start gap-5">
          <div className="flex gap-1 ">
            <button onClick={() => handleLike()}>
              {!post.likes.includes(allData["currentUser"].id) ? (
                <IconHeart className="w-6 h-6" />
              ) : (
                <IconHeartFilled className="w-6 h-6 text-red-600" />
              )}
            </button>
            <p className="text-[17px] flex items-center justify-center mt-[2px]">
              {post.likes.length}
            </p>
          </div>
          <div className="flex items-center justify-center gap-1">
            <button
              onClick={() => navigate("/comments", { state: { post, user } })}
            >
              <IconMessage className="w-6 h-6" />
            </button>
            <p className="text-[17px] flex items-center justify-center mt-[2px]">
              {post.comments.length}
            </p>
          </div>
        </div>
        <p className="h-10 flex items-center justify-end text-[13px] text-zinc-300">
          {post.time}
        </p>
      </div>
    </div>
  );
}

export default PostDiv;
