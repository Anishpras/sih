import React, { ReactNode } from "react";
import NavBar from "../navbar";
import Sidebar from "../sidebar";
interface MainLayoutProps {
  children: ReactNode;
  headerData: { route: string; name: string }[];
  sidebarData: { route: string; name: string }[];
}
export default function MainLayout({
  children,
  headerData,
  sidebarData,
}: MainLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-primary">
      <Sidebar sidebarData={sidebarData} />
      <section className="flex w-full flex-col md:w-[calc(100vw-250px)]  ">
        <div className="px-2 pt-5">
          <NavBar headerData={headerData} />
        </div>
        <main className="overflow-y-scroll px-2 pt-3 ">
          <section className="h-[calc(100vh-150px)] overflow-y-scroll rounded-xl bg-secondary p-3 ">
            {children}
          </section>
        </main>
      </section>
    </div>
  );
}
