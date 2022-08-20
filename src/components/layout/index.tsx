import React, { ReactNode } from "react";
import NavBar from "../navbar";
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
    <div className="flex min-h-screen w-full bg-primary">
      <Sidebar
        sidebarData={sidebarData}
        setToggleSidebar={setToggleSidebar}
        toggleSidebar={toggleSidebar}
      />
      <section className="flex w-full flex-col md:w-[calc(100vw-200px)]  ">
        <div className="md:px-2 md:pt-5">
          <NavBar headerData={headerData} setToggleSidebar={setToggleSidebar} />
        </div>
        <main className="overflow-y-scroll pt-3 md:px-2 ">
          <section className="min-h-screen bg-secondary p-3 md:min-h-full md:h-[calc(100vh-150px)] md:overflow-y-scroll md:rounded-xl ">
            {children}
          </section>
        </main>
      </section>
    </div>
  );
}
