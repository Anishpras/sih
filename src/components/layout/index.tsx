import React, { ReactNode } from "react";
import { Header } from "../navbar";
import Sidebar from "../sidebar";
interface MainLayoutProps {
  children: ReactNode;
  // headerData: { route: string; name: string }[];
  sidebarData: { route: string; name: string }[];
  toggleSidebar: boolean;
  setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  headerTitle: string;
}
export default function MainLayout({
  children,
  sidebarData,
  toggleSidebar,
  headerTitle,
  setToggleSidebar,
}: MainLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-black">
      <Sidebar
        sidebarData={sidebarData}
        setToggleSidebar={setToggleSidebar}
        toggleSidebar={toggleSidebar}
      />
      <section className="relative flex w-full flex-col bg-primaryWhite md:top-5 md:mx-2 md:h-[calc(100vh-5vh)]  md:w-[calc(100vw-200px)] md:overflow-y-scroll md:rounded-xl  ">
        <Header headerTitle={headerTitle} setToggleSidebar={setToggleSidebar} />
        <main className=" pt-3 md:px-2 relative min-h-screen px-2 ">{children}</main>
      </section>
    </div>
  );
}
