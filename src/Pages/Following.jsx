import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserCard from "../Components/UserCard";
import NoPosts from "../Components/NoPosts";
import BubbleMessage from "../Components/BubbleMessage";
import CancelBtn from "../Components/CancelBtn";

function Following({
  showMessage,
  message,
  allData,
  setAllData,
  visitedUser,
  setVisitedUser,
  visitUser,
}) {
  const navigate = useNavigate();

  const location = useLocation();
  const { user } = location.state || {};

  const renderFollowing = () => {
    if (allData[user].following.length) {
      return allData[user].following
        .slice()
        .reverse()
        .map((followingId, index) => {
          // Find by id))))))))))))))))))))))))))))))))))))
          const followingData = Object.values(allData).find(
            (userData) => userData.id === followingId
          );

          if (!followingData) return null;

          return (
            <UserCard
              key={index}
              allData={allData}
              setAllData={setAllData}
              user={followingData.name}
              thisFollows={user}
              initial={followingData.name.charAt(0)}
              visitedUser={visitedUser}
              setVisitedUser={setVisitedUser}
              visitUser={visitUser}
              changeButton={true}
            />
          );
        });
    } else {
      return (
        <NoPosts
          title={
            user == "currentUser"
              ? "You have no followings"
              : `${user} has no followings`
          }
        />
      );
    }
  };

  return (
    <div
      className="appear w-full min-h-screen relative h-full flex flex-col gap-4
       overflow-y-scroll items-center bg-zinc-900 text-white pb-[130px]"
    >
      {showMessage && <BubbleMessage message={message} />}
      <CancelBtn onClick={() => navigate(-1)} />
      <h1
        className="h-[66px] flex items-center justify-center
        text-xl font-semibold"
      >
        Followings
      </h1>
      {renderFollowing()}
    </div>
  );
}

export default Following;
