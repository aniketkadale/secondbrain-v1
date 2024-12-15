import { SidebarItemProps } from "../interfaces/SidebarItemProps";

export const SidebarItem = (props: SidebarItemProps) => {
  return (
    <div className="flex mx-5 items-center hover:bg-gray-200 rounded-md transition-all duration-250">
      <div className="p-2 cursor-pointer text-gray-600">{props.icon}</div>
      <div className="p-2 font-semibold cursor-pointer text-gray-600">
        {props.text}
      </div>
    </div>
  );
};
