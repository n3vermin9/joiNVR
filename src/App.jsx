import ProtectedRoute from "./ProtectedRoute";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import EditProfile from "./Pages/EditProfile";
import Settings from "./Pages/Settings";
import Account from "./Pages/SettingsPages/Account";
import { useEffect, useState } from "react";
import DeleteAccount from "./Pages/SettingsPages/DeleteAccount";
import ChangePassword from "./Pages/SettingsPages/ChangePassword";
import LogOut from "./Pages/SettingsPages/LogOut";
import Post from "./Pages/Post";
import Fyp from "./Pages/Fyp";
import "./App.css";
import VisitProfile from "./Pages/VisitProfile";
import Comments from "./Pages/Comments";
import Followers from "./Pages/Followers";
import Following from "./Pages/Following";

function App() {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const [allData, setAllData] = useState(() => {
    const getData = localStorage.getItem("allData");
    return getData ? JSON.parse(getData) : null;
  });

  const [navOffset, setNavOffset] = useState(() => {
    const getOffset = localStorage.getItem("navOffset");
    return getOffset ? JSON.parse(getOffset) : 0;
  });

  useEffect(() => {
    localStorage.setItem("navOffset", JSON.stringify(navOffset));
  }, [navOffset]);

  const [visitedUser, setVisitedUser] = useState(() => {
    const storedUser = localStorage.getItem("visitedUser");
    return storedUser ? JSON.parse(storedUser) : [];
  });

  useEffect(() => {
    localStorage.setItem("visitedUser", JSON.stringify(visitedUser));
  }, [visitedUser]);

  const triggerMessage = (msg) => {
    setMessage(msg);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  const visitUser = (profile) => {
    navigate(`/visitProfile`);
    console.log(profile)
    let checkProfile =
    profile == undefined ? allData["currentUser"] : profile;
    console.log(checkProfile)
    setVisitedUser(checkProfile);
  };

  const commonProps = {
    triggerMessage,
    showMessage,
    setShowMessage,
    message,
    onProfileUpdate: triggerMessage,
    allData,
    setAllData,
    navOffset,
    setNavOffset,
    visitedUser,
    setVisitedUser,
    visitUser,
  };

  return (
    <Routes>
      <Route path="/logIn" element={<Login {...commonProps} />} />
      <Route path="/signUp" element={<SignUp {...commonProps} />} />

      <Route
        path="/"
        element={
          <ProtectedRoute user={allData}>
            <Profile {...commonProps} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/post"
        element={
          <ProtectedRoute user={allData}>
            <Post {...commonProps} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/fyp"
        element={
          <ProtectedRoute user={allData}>
            <Fyp {...commonProps} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/editProfile"
        element={
          <ProtectedRoute user={allData}>
            <EditProfile {...commonProps} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute user={allData}>
            <Settings {...commonProps} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account"
        element={
          <ProtectedRoute user={allData}>
            <Account {...commonProps} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/deleteAccount"
        element={
          <ProtectedRoute user={allData}>
            <DeleteAccount {...commonProps} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/changePassword"
        element={
          <ProtectedRoute user={allData}>
            <ChangePassword {...commonProps} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/logOut"
        element={
          <ProtectedRoute user={allData}>
            <LogOut {...commonProps} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/visitProfile"
        element={
          <ProtectedRoute user={allData}>
            <VisitProfile {...commonProps} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/comments"
        element={
          <ProtectedRoute user={allData}>
            <Comments {...commonProps} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/followers"
        element={
          <ProtectedRoute user={allData}>
            <Followers {...commonProps} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/following"
        element={
          <ProtectedRoute user={allData}>
            <Following {...commonProps} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
