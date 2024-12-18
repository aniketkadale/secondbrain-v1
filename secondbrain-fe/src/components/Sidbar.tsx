import { useNavigate } from "react-router-dom";
import { BrainIcon } from "../icons/BrainIcon";
import { DocIcon } from "../icons/DocIcon";
import { LinkIcon } from "../icons/LinkIcon";
import { TagIcon } from "../icons/TagIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-72 bg-white left-0 top-0 border-r shadow-sm absolute">
      <div
        className="flex just m-4 gap-2 items-center cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        <div className="text-purple-600">
          <img className="h-12 text-purple-600" src="/brain.png" alt="logo" />
        </div>
        <h1 className="font-bold text-2xl text-gray-800">Second Brain</h1>
      </div>
      <SidebarItem
        icon={<TwitterIcon size="md" />}
        text="Tweets"
        onClick={() => navigate("/tweets")}
      />
      <SidebarItem
        icon={<YoutubeIcon size="md" />}
        text="YouTube"
        onClick={() => navigate("/youtube")}
      />
      <SidebarItem icon={<DocIcon size="md" />} text="Documents" />
      <SidebarItem icon={<LinkIcon size="md" />} text="Links" />
      <SidebarItem icon={<TagIcon size="md" />} text="Tags" />
    </div>
  );
};
