import Link from "next/link";
import React from "react";
interface SidebarComponentProps {
  sidebarData: { route: string; name: string }[];
}

interface Props {
  sidebarData: { route: string; name: string }[];
  toggleSidebar: boolean;
  setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

// const sideBarButtonStyle = "text-white  ";
export const Side = ({ sidebarData }: SidebarComponentProps) => {
  return (
    <>
      <div className=" relative top-5 ml-2 hidden h-[95vh] min-w-[250px]  flex-col items-start rounded-xl bg-secondary pt-10 pl-5 md:flex">
        {sidebarData.map((n, index) => {
          return (
            <Link key={index} href={n.route}>
              <button className="flex items-center rounded-lg  bg-primary p-2 text-base  font-normal text-white">
                <span className="flex-1 whitespace-nowrap px-3 text-lg ">
                  {n.name}
                </span>
              </button>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default function SidebarComponent({
  sidebarData,
  toggleSidebar,
  setToggleSidebar,
}: Props) {
  return (
    <>
      <div
        className={`fixed inset-0 z-20 bg-black opacity-50 transition-opacity lg:hidden ${
          toggleSidebar ? "block" : "hidden"
        }`}
        onClick={() => setToggleSidebar((prevState: any) => !prevState)}
      ></div>

      <div
        className={`fixed inset-y-0 top-0 z-30  min-w-[200px] transform  flex-col items-start overflow-y-auto rounded-tr-xl rounded-br-xl px-2 pt-10 pl-5 transition duration-300 md:relative md:top-5 md:ml-2 md:flex md:h-[95vh] md:translate-x-0 md:rounded-xl ${
          toggleSidebar
            ? "h-full translate-x-0 bg-black  ease-out"
            : "-translate-x-full ease-in  "
        }`}
      >
        <nav className="w-full pr-4">
          {sidebarData.map((n, index) => {
            return (
              <Link key={index} href={n.route}>
                <button className="flex w-full items-center  rounded-lg bg-black hover:bg-darkSecondary p-2 font-Raleway text-xl font-semibold  text-white">
                  {n.name}
                </button>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
