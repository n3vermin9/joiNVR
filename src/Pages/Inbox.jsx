import React from "react";
import NoPosts from "../Components/NoPosts";
import BubbleMessage from "../Components/BubbleMessage";
import CancelBtn from "../Components/CancelBtn";
import { useNavigate } from "react-router-dom";
import NotificationDiv from "../Components/NotificationDiv";

function Inbox({
  showMessage,
  message,
  allData,
  setAllData,
  visitedUser,
  setVisitedUser,
  visitUser,
}) {
  const navigate = useNavigate();

  const handleRead = () => {
    const newAllData = {
      ...allData,
      currentUser: {
        ...allData.currentUser,
        inbox: allData.currentUser.inbox.map((notif) => ({
          ...notif,
          unread: false,
        })),
      },
    };
    console.log(1)
    setAllData(newAllData);
    localStorage.setItem("allData", JSON.stringify(newAllData));
  };

  const renderNotifications = () => {
    return allData["currentUser"].inbox
      .slice()
      .reverse()
      .map((item, index) => {
        return (
          <NotificationDiv
            key={index}
            user={item.user}
            notification={item.notification}
            icon={item.icon}
            link={item.link}
            time={item.time}
            unread={item.unread}
            allData={allData}
            visitUser={visitUser}
          />
        );
      });
  };
  return (
    <div
      className="appear w-full min-h-screen relative h-full flex flex-col gap-4
       overflow-y-scroll items-center bg-zinc-900 text-white pb-[130px]"
    >
      {showMessage && <BubbleMessage message={message} />}
      <CancelBtn
        onClick={() => {
          navigate(-1);
          handleRead();
        }}
      />
      <h1
        className="h-[66px] flex items-center justify-center
        text-xl font-semibold"
      >
        Inbox
      </h1>
      {allData["currentUser"].inbox.length ? (
        renderNotifications()
      ) : (
        <NoPosts title={"You have no notifications"} />
      )}
    </div>
  );
}

export default Inbox;
