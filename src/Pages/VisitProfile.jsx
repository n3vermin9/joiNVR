import React, { useEffect, useState } from "react";
import BubbleMessage from "../Components/BubbleMessage";
import Pfp from "../Components/Pfp";
import ProfileNumbers from "../Components/ProfileNumbers";
import PostDiv from "../Components/PostDiv";
import NavBar from "../Components/NavBar";
import NoPosts from "../Components/NoPosts";
import CancelBtn from "../Components/CancelBtn";
import { useNavigate } from "react-router-dom";

function VisitProfile({
  triggerMessage,
  onProfileUpdate,
  message,
  showMessage,
  allData,
  setAllData,
  navOffset,
  setNavOffset,
  visitedUser,
  setVisitedUser,
}) {
  const navigate = useNavigate();
  useEffect(() => {
    if (visitedUser?.name === allData?.currentUser?.name) {
      setNavOffset(0);
      navigate("/");
    }
  }, [visitedUser, allData, navigate]);

  const [currentProfile, setCurrentProfile] = useState(visitedUser);

  useEffect(() => {
    if (visitedUser && allData) {
      const userFollowers = Object.values(allData).flatMap(
        (user) => user.followers || []
      );
      const updatedUser = userFollowers.find((f) => f.id === visitedUser.id);
      if (updatedUser) {
        setCurrentProfile(updatedUser);
      }
    }
  }, [allData, visitedUser?.id]);

  const handlePostsAppear = () => {
    const userData = Object.values(allData).find(
      (user) => user.id === visitedUser.id
    );
    if (!userData || !userData.posts || userData.posts.length === 0) {
      return <NoPosts title={`${visitedUser.name} has no posts`} />;
    }

    const visitedUserPosts = userData.posts.map((post, index) => ({
      ...post,
      user: visitedUser.name,
      userId: visitedUser.id,
      postIndex: index,
    }));

    return visitedUserPosts
      .slice()
      .sort((a, b) => a.id - b.id)
      .reverse()
      .map((post) => (
        <PostDiv
          key={post.id}
          post={post}
          allData={allData}
          setAllData={setAllData}
          user={visitedUser.name}
        />
      ));
  };

  const handleFollow = () => {
    const isFollowing = visitedUser.followers?.includes(allData.currentUser.id);
    const updatedFollowers = isFollowing
      ? visitedUser.followers.filter((id) => id !== allData.currentUser.id)
      : [...(visitedUser.followers || []), allData.currentUser.id];

    const updatedFollowing = isFollowing
      ? allData["currentUser"].following.filter((id) => id !== visitedUser.id)
      : [...(allData["currentUser"].following || []), visitedUser.id];

    const updatedMe = {
      ...allData["currentUser"],
      following: updatedFollowing,
    };

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

    let updatedInbox;

    const notificationId = `${allData["currentUser"].id}_${currentProfile.id}`;

    const newNotification = {
      id: notificationId,
      user: allData["currentUser"].name,
      notification: `started following you`,
      link: "",
      icon: "person",
      time: time,
      unread: true,
    };

    updatedInbox = [...allData[currentProfile.name].inbox];

    if (isFollowing) {
      updatedInbox = updatedInbox.filter(
        (notif) => notif.id !== notificationId
      );
    } else {
      updatedInbox.push(newNotification);
    }

    const updatedUser = {
      ...allData[visitedUser.name],
      followers: updatedFollowers,
      inbox: updatedInbox,
    };

    const newAllData = {
      ...allData,
      [visitedUser.name]: updatedUser,
      ["currentUser"]: updatedMe,
    };

    setVisitedUser(newAllData[visitedUser.name]);
    setAllData(newAllData);
    localStorage.setItem("allData", JSON.stringify(newAllData));
  };

  const handleFollowButtonAppear = () => {
    const isFollowing = visitedUser.followers?.includes(allData.currentUser.id);
    return (
      <button
        onClick={handleFollow}
        className={`w-full h-8 text-white text-sm font-extrabold rounded ${
          isFollowing ? "bg-zinc-800 border-2 border-zinc-700" : "bg-zinc-600"
        }`}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    );
  };

  return (
    <>
      <div className="appear w-full min-h-screen relative h-full flex flex-col gap-4 overflow-y-scroll items-center bg-zinc-900 text-white pb-[130px]">
        {showMessage && <BubbleMessage message={message} />}
        <CancelBtn onClick={() => navigate(-1)} />
        <div className="relative border-b-[1px] border-zinc-700 w-[100%] px-2 py-4 flex flex-col items-center justify-around">
          <div className="relative rounded-md w-[100%] h-[178px] pt-4 flex items-center justify-around px-2">
            <Pfp
              size={24}
              data={allData}
              name={visitedUser.name.charAt(0)}
              color={visitedUser.color}
            />
            <p className="absolute top-0 text-lg font-extrabold">
              {visitedUser.name}
            </p>
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="flex gap-2">
                <ProfileNumbers
                  number={visitedUser.following.length}
                  title={"Following"}
                  onClick={() =>
                    navigate("/following", {
                      state: { user: visitedUser.name },
                    })
                  }
                />
                <ProfileNumbers
                  number={visitedUser.followers.length}
                  title={"Followers"}
                  onClick={() =>
                    navigate("/followers", {
                      state: { user: visitedUser.name },
                    })
                  }
                />
                <ProfileNumbers
                  number={visitedUser.posts.length}
                  title={"Posts"}
                />
              </div>
              {handleFollowButtonAppear()}
            </div>
          </div>
          <p className="w-full items-center justify-start px-6 break-words whitespace-normal">
            {visitedUser.bio ? visitedUser.bio : "No bio yet"}
          </p>
        </div>
        {handlePostsAppear()}
      </div>
      <NavBar navOffset={navOffset} setNavOffset={setNavOffset} />
    </>
  );
}

export default VisitProfile;
