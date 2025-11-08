import React, { useState } from "react";
import BubbleMessage from "../Components/BubbleMessage";
import NavBar from "../Components/NavBar";
import { useNavigate } from "react-router-dom";
import PostDiv from "../Components/PostDiv";
import SearchBtn from "../Components/SearchBtn";
import InboxBtn from "../Components/InboxBtn";
import NoPosts from "../Components/NoPosts";
import Input from "../Components/Input";
import UserCard from "../Components/UserCard";

function Fyp({
  triggerMessage,
  message,
  showMessage,
  allData,
  setAllData,
  navOffset,
  setNavOffset,
  visitedUser,
  setVisitedUser,
  visitUser,
}) {
  const [isSearch, setIsSearch] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const navigate = useNavigate();

  const toggleSearch = () => {
    setIsSearch(!isSearch);
  };

  const keys = Object.keys(allData);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (newValue === "") {
      setSearchResult([]);
      return;
    }

    const results = keys.filter(
      (key) => key.includes(newValue) && key !== "currentUser"
    );
    setSearchResult(results);
  };

  const handleSearchAppear = () => {
    return (
      <>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder={"Username"}
          classes={
            "up bg-zinc-800 border border-zinc-600 text-white rounded-[100px] mt-[10px]"
          }
        />
        {searchResult.length && inputValue !== "" ? (
          <div className="w-full flex flex-col items-center justify-center gap-y-4 mt-6">
            {searchResult.map((user, index) => (
              <UserCard
                key={index}
                allData={allData}
                setAllData={setAllData}
                user={user}
                initial={user.charAt(0)}
                visitedUser={visitedUser}
                setVisitedUser={setVisitedUser}
                visitUser={visitUser}
              />
            ))}
          </div>
        ) : (
          <p
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2
           text-zinc-500 up w-full flex items-center justify-center"
          >
            No result found
          </p>
        )}
      </>
    );
  };

  const handlePostsAppear = () => {
    const users = Object.entries(allData).filter(
      ([key]) => key !== "currentUser"
    );

    const allPosts = users.flatMap(([userKey, userData]) =>
      userData.posts.map((post, index) => ({
        ...post,
        user: userData.name,
        userKey,
        postIndex: index,
      }))
    );
    allPosts.sort((a, b) => a.id - b.id);

    if (allPosts.length == 0) {
      return <NoPosts title={"Welcome!"} />;
    }

    return allPosts
      .slice()
      .reverse()
      .map((post, index) => (
        <PostDiv
          key={index}
          post={post}
          allData={allData}
          setAllData={setAllData}
          user={post.user}
          visitUser={visitUser}
          // handleMore={handleMore}
        />
      ));
  };
  return (
    <>
      <div className="appear w-full min-h-screen h-full hide-scrollbar
       flex flex-col gap-4 overflow-y-scroll items-center bg-zinc-900
        text-white pb-[130px]">
        {showMessage && <BubbleMessage message={message} />}
        <div className="h-[60px] w-full border-b-[1px] border-zinc-700
         text-lg flex font-semibold items-center justify-center text-white">
          <InboxBtn allData={allData}/>
          <h1 className="">JoiNVR</h1>
          <SearchBtn onClick={toggleSearch} isSearch={isSearch} />
        </div>
        {!isSearch ? handlePostsAppear() : handleSearchAppear()}
      </div>
      <NavBar navOffset={navOffset} setNavOffset={setNavOffset} />
    </>
  );
}

export default Fyp;
