import Link from "next/link";
import React from "react";
interface SidebarComponentProps {
  sidebarData: { route: string; name: string }[];
}
// const sideBarButtonStyle = "text-white  ";
export default function SidebarComponent({
  sidebarData,
}: SidebarComponentProps) {
  return (
    <div className=" relative top-5 ml-2 flex h-[95vh]  min-w-[250px] flex-col items-start rounded-xl bg-secondary pt-10 pl-5">
      {sidebarData.map((n, index) => {
        return (
          <Link key={index} href={n.route}>
            <button className="flex items-center rounded-lg  bg-primary p-2 text-base  font-normal text-white">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 1024 1024"
                className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                height="1em"
                width="1em"
              >
                <path d="M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3 22.2 52.4 53.9 99.5 94.3 139.9 40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6 52.4-22.2 99.5-53.9 139.9-94.3 40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7-63.1 26.8-130.2 40.3-199.3 40.3z"></path>
              </svg>
              <span className="flex-1 whitespace-nowrap px-3 text-lg ">
                {n.name}
              </span>
            </button>
          </Link>
        );
      })}
    </div>
  );
}
