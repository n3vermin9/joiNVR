import React from "react";
import Pfp from "./Pfp";
import { IconChevronRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

function UserCard({
  allData,
  setAllData,
  user,
  initial,
  visitedUser,
  setVisitedUser,
  visitUser,
  changeButton,
  thisFollows,
}) {
  const navigate = useNavigate();

  // let isIncluded = allData["currentUser"].followers.includes(
  //   allData[visitedUser.name]?.id
  // );

  // let handleRemoveButton = () => {
  //   // console.log(allData[thisFollows].followers);
  //   let followers = allData[thisFollows].followers;
  //   let newFollowers = followers.filter((f) => f !== allData[user].id);

  //   let following = allData[user].following;
  //   let newFollowing = following.filter(
  //     (f) => f !== allData["currentUser"].id
  //   );

  //   const newAllData = {
  //     ...allData,
  //     [user]: {
  //       ...allData[user],
  //       following: newFollowing,
  //     },
  //     ["currentUser"]: {
  //       ...allData["currentUser"],
  //       followers: newFollowers,
  //     },
  //   };
  //   console.log(newAllData);
  //   setAllData(newAllData);
  //   localStorage.setItem("allData", JSON.stringify(newAllData));
  // };

  // console.log(allData["currentUser"].following.includes(allData[user]?.id));

  // let isFollowing = allData["currentUser"].following.includes(
  //   allData[user]?.id
  // );

  // let handleFollowButton = () => {
  //   const updatedFollowers = isFollowing
  //     ? allData[user].followers.filter((id) => id !== allData["currentUser"].id)
  //     : [...(allData[user].followers || []), allData["currentUser"].id];

  //   const updatedFollowing = isFollowing
  //     ? allData["currentUser"].following.filter(
  //         (id) => id !== allData[user].id
  //       )
  //     : [...(allData["currentUser"].following || []), allData[user].id];

  //   const newAllData = {
  //     ...allData,
  //     [user]: {
  //       ...allData[user],
  //       followers: updatedFollowers,
  //     },
  //     currentUser: {
  //       ...allData["currentUser"],
  //       following: updatedFollowing,
  //     },
  //   };
  //   console.log(newAllData);
  //   setAllData(newAllData);
  //   localStorage.setItem("allData", JSON.stringify(newAllData));
  // };

  // const displayButtonText = () => {
  //   console.log(thisFollows);
  //   if (allData["currentUser"].following.includes(allData[user].id)) {
  //     return "Unfollow";
  //   } else {
  //     return "Follow";
  //   }
  // };

  // const handleButton = () => {
  //   console.log(allData["currentUser"].following);
  //   if (!changeButton || user === allData["currentUser"].name) {
  //     return <IconChevronRight className="absolute right-3" />;
  //   }
  //   return (
  //     <div className="absolute right-[4%] w-fit gap-2 flex justify-between">
  //       {thisFollows !== "currentUser" && (
  //         <button
  //           onClick={(e) => {
  //             e.stopPropagation();
  //             if (isFollowing) {
  //               handleRemoveButton();
  //             } else {
  //               handleFollowButton();
  //             }
  //           }}
  //           className={`w-fit px-2 h-8 text-white text-sm z-50
  //            font-extrabold rounded ${
  //              (isIncluded && user !== allData["currentUser"].name) ||
  //              isFollowing
  //                ? "bg-zinc-800 border-2 border-zinc-700"
  //                : "bg-zinc-600"
  //            }`}
  //         >
  //           {displayButtonText()}
  //         </button>
  //       )}
  //       {allData["currentUser"].followers.includes(allData[user].id) &&
  //         thisFollows == "currentUser" && (
  //           <button
  //             onClick={(e) => {
  //               e.stopPropagation();
  //               handleRemoveButton();
  //             }}
  //             className={`w-fit px-2 bg-zinc-800 border-2
  //              border-zinc-700 h-8 text-white text-sm z-50 font-extrabold rounded`}
  //           >
  //             Remove
  //           </button>
  //         )}
  //     </div>
  //   );
  // };

  return (
    <div
      onClick={() => visitUser(allData[user])}
      className="up w-[86%] h-[70px] border border-zinc-600
     bg-zinc-800/40 rounded-md flex items-center gap-5 px-3"
    >
      <Pfp
        size={12}
        data={allData}
        name={initial}
        color={
          allData[user === allData["currentUser"].name ? "currentUser" : user]
            .color
        }
      />
      <h1>{user}</h1>
      <IconChevronRight className="absolute right-3" />{" "}
    </div>
  );
}

export default UserCard;
