import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BubbleMessage from "../Components/BubbleMessage";
import CancelBtn from "../Components/CancelBtn";
import NoPosts from "../Components/NoPosts";
import UserCard from "../Components/UserCard";

function Followers({
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

  const renderFollowers = () => {
    if (allData[user].followers.length) {
      return allData[user].followers
        .slice()
        .reverse()
        .map((followerId, index) => {
          // Find by id))))))))))))))))))))))))))))))))))))
          const followerData = Object.values(allData).find(
            (userData) => userData.id === followerId
          );

          if (!followerData) return null;

          return (
            <UserCard
              key={index}
              allData={allData}
              setAllData={setAllData}
              user={followerData.name}
              thisFollows={user}
              initial={followerData.name.charAt(0)}
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
              ? "You have no followers"
              : `${user} has no followers`
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
        Followers
      </h1>
      {renderFollowers()}
    </div>
  );
}

export default Followers;
