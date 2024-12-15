import { BrainIcon } from "../icons/BrainIcon";
import { DocIcon } from "../icons/DocIcon";
import { LinkIcon } from "../icons/LinkIcon";
import { TagIcon } from "../icons/TagIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export const Sidebar = () => {
  return (
    <div className="h-screen w-72 bg-white left-0 top-0 border-r shadow-md absolute">
      <div className="flex just m-4 gap-2 items-center">
        <div className="text-purple-600">
          <BrainIcon />
        </div>
        <h1 className="font-bold text-2xl text-gray-800">Second Brain</h1>
      </div>
      <SidebarItem icon={<TwitterIcon size="md" />} text="Tweets" />
      <SidebarItem icon={<YoutubeIcon size="md" />} text="YouTube" />
      <SidebarItem icon={<DocIcon size="md" />} text="Documents" />
      <SidebarItem icon={<LinkIcon size="md" />} text="Links" />
      <SidebarItem icon={<TagIcon size="md" />} text="Tags" />
    </div>
  );
};
