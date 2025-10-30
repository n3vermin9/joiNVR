import React from "react";
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
}) {
  const navigate = useNavigate();
  const handlePostsAppear = () => {
    const userData = Object.values(allData).find(
      (user) => user.id === visitedUser.id
    );
    if (!userData || !userData.posts || userData.posts.length === 0) {
      return <NoPosts title={`${visitedUser.name} have no posts`} />;
    }

    const visitedUserPosts = userData.posts.map((post, index) => ({
      ...post,
      user: visitedUser.name,
      userId: visitedUser.id,
      postIndex: index,
    }));

    visitedUserPosts.sort((a, b) => a.id - b.id);

    return visitedUserPosts
      .slice()
      .reverse()
      .map((post, index) => (
        <PostDiv
          key={post.id} // use post.id if unique
          post={post}
          allData={allData}
          setAllData={setAllData}
          user={visitedUser.name}
          // handleMore={handleMore}
        />
      ));
  };

  // const handlePostsAppear = () => {
  //   if (visitedUser.posts.length) {
  //     return visitedUser.posts
  //       .slice()
  //       .reverse()
  //       .map((post, index) => (
  //         <PostDiv
  //           key={index}
  //           post={post}
  //           allData={allData}
  //           setAllData={setAllData}
  //           user={visitedUser.name}
  //           initial={visitedUser.name.charAt(0)}
  //         />
  //       ));
  //   } else {
  //     return <NoPosts title={`${visitedUser.name} have no posts`} />;
  //   }
  // };
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
                  number={visitedUser.posts.length}
                  title={"Posts"}
                />
                <ProfileNumbers number={0} title={"Following"} />
                <ProfileNumbers number={0} title={"Followers"} />
              </div>
              <button
                onClick={() => navigate("/editProfile")}
                className="w-full h-8 bg-zinc-600 text-white text-sm font-extrabold rounded"
              >
                Follow
              </button>
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
