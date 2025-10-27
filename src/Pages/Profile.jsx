import { Navigate, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import NoPosts from "../Components/NoPosts";
import Pfp from "../Components/Pfp";
import ProfileNumbers from "../Components/ProfileNumbers";
import SettingsBtn from "../Components/SettingsBtn";
import { useEffect, useRef, useState } from "react";
import BubbleMessage from "../Components/BubbleMessage";
import PostDiv from "../Components/PostDiv";

function Profile({
  triggerMessage,
  onProfileUpdate,
  message,
  showMessage,
  allData,
  setAllData,
  navOffset,
  setNavOffset
}) {
  const navigate = useNavigate();

  const handlePostsAppear = () => {
    if (allData[`currentUser`].posts.length) {
      return allData[`currentUser`].posts
        .slice()
        .reverse()
        .map((post, index) => (
          <PostDiv
            key={index}
            post={post}
            allData={allData}
            setAllData={setAllData}
            user={allData[`currentUser`].name}
            initial={allData[`currentUser`].name.charAt(0)}
            handleMore={handleMore}
          />
        ));
    } else {
      return <NoPosts title={"You have no posts"} />;
    }
  };
  const handleMore = (id) => {
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
    setAllData(newAllData);
    localStorage.setItem("allData", JSON.stringify(newAllData));
  };

  return (
    <>
      <div className="appear w-full min-h-screen relative h-full flex flex-col gap-4 overflow-y-scroll items-center bg-zinc-900 text-white pb-[130px]">
        {showMessage && <BubbleMessage message={message} />}
        <div className="relative border-b-[1px] border-zinc-700 w-[100%] px-2 py-4 flex flex-col items-center justify-around">
          <SettingsBtn />
          <div className="relative rounded-md w-[100%] h-[178px] pt-4 flex items-center justify-around px-2">
            <Pfp
              size={24}
              data={allData}
              name={allData[`currentUser`].name.charAt(0)}
            />
            <p className="absolute top-0 text-lg font-extrabold">
              {allData[`currentUser`].name}
            </p>
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="flex gap-2">
                <ProfileNumbers
                  number={allData[`currentUser`].posts.length}
                  title={"Posts"}
                />
                <ProfileNumbers number={0} title={"Following"} />
                <ProfileNumbers number={0} title={"Followers"} />
              </div>
              <button
                onClick={() => navigate("/editProfile")}
                className="w-full h-8 bg-zinc-600 text-white text-sm font-extrabold rounded"
              >
                Edit profile
              </button>
            </div>
          </div>
          <p className="w-full items-center justify-start px-6 break-words whitespace-normal">
            {allData[`currentUser`].bio
              ? allData[`currentUser`].bio
              : "No bio yet"}
          </p>
        </div>
        {handlePostsAppear()}
      </div>
      <NavBar navOffset={navOffset} setNavOffset={setNavOffset}/>
    </>
  );
}

export default Profile;
