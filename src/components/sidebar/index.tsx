import Link from "next/link";
import React from "react";

interface Props {
  sidebarData: { route: string; name: string }[];
  toggleSidebar: boolean;
  logout: () => void | string;
  setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

// const sideBarButtonStyle = "text-white  ";
const cookieRemove = (name: string) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  window.location.reload();
};

export default function SidebarComponent({
  sidebarData,
  logout,
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
        <nav className="relative h-screen w-full pr-4">
          {sidebarData.map((n, index) => {
            return (
              <Link key={index} href={n.route}>
                <button
                  type="button"
                  className="my-5 flex w-full items-center  rounded-lg bg-black p-2 text-left font-Raleway text-xl font-semibold text-white  hover:bg-darkSecondary"
                >
                  {n.name}
                </button>
              </Link>
            );
          })}
          <br className="bg-white" />
          <section className="relative -bottom-96">
            <button
              type="button"
              className="my-5 flex w-full items-center  rounded-lg bg-black p-2 text-left font-Raleway text-xl font-semibold text-white  hover:bg-darkSecondary"
              onClick={logout}
            >
              Log-Out
            </button>
          </section>
        </nav>
      </div>
    </>
  );
}
