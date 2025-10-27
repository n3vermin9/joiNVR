import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NavBarBtn({ icon: Icon, path, offset, navOffset, setNavOffset }) {
  const navigate = useNavigate();
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [targetPath, setTargetPath] = useState("");

  const handleButtonClick = () => {
    setNavOffset(offset);
    setTimeout(() => {
      navigate(path);
    }, 70);
  };

  useEffect(() => {
    if (shouldNavigate && targetPath) {
      navigate(targetPath);
      setShouldNavigate(false);
      setTargetPath("");
    }
  }, [shouldNavigate, targetPath, navigate]);

  return (
    <button
      onClick={handleButtonClick}
      className="h-full flex flex-1 items-center justify-center z-50 relative"
    >
      <Icon className="w-7 h-7" />
    </button>
  );
}

export default NavBarBtn;
