import React from 'react'
import Input from './Input';

function EditProfileInput({title, value, onChange}) {
  return (
    <div className="flex items-center h-[30px] justify-between gap-2 border-b border-zinc-700 py-2">
      <p className="w-[50px]">{title}:</p>
      <Input
        value={value}
        onChange={onChange}
        placeholder={title}
        classes={"h-[28px] w-[280px] bg-transparent text-[17px]"}
      />
    </div>
  );
}

export default EditProfileInput
