import {
  IconChevronRight,
} from "@tabler/icons-react";
import React from "react";
import { Link } from "react-router-dom";

function SettingSection({ icon: Icon, title, location }) {
  return (
    <Link
      to={location}
      className="relative w-[90%] border-b border-zinc-600 h-[40px] px-2 flex gap-5 items-center"
    >
      <Icon className="w-7 h-7" />
      <p className="text-lg">{title}</p>
      <IconChevronRight className="absolute right-0" />
    </Link>
  );
}

export default SettingSection;
