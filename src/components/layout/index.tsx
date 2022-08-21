import React, { ReactNode } from "react";
import NavBar, { Header } from "../navbar";
import Sidebar from "../sidebar";
interface MainLayoutProps {
  children: ReactNode;
  headerData: { route: string; name: string }[];
  sidebarData: { route: string; name: string }[];
  toggleSidebar: boolean;
  setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function MainLayout({
  children,
  headerData,
  sidebarData,
  toggleSidebar,
  setToggleSidebar,
}: MainLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-black">
      <Sidebar
        sidebarData={sidebarData}
        setToggleSidebar={setToggleSidebar}
        toggleSidebar={toggleSidebar}
      />
      <section className="relative flex w-full flex-col md:overflow-y-scroll bg-primaryWhite md:top-5 md:mx-2  md:h-[calc(100vh-5vh)] md:w-[calc(100vw-200px)] md:rounded-xl  ">
        <Header />
        <main className=" pt-3 md:px-2 ">{children}</main>
      </section>
    </div>
  );
}
