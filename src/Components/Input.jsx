import React, { useState } from "react";

function Input({ placeholder, classes, value, onChange, onKeyDown }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className={`${classes} h-[50px] outline-none w-[85%] rounded-md px-4 text-lg`}
    />
  );
}

export default Input;
