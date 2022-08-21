import { useRouter } from "next/router";
import React, { useState } from "react";
import MainLayout from "../../components/layout";
import { Loader } from "../../components/loader/Loader";
import { useAdminContext } from "../../context/admin.context";


const headerTitle = "Admin ";
const sidebarData = [
  {
    route: "/admin",
    name: "Dashboard",
  },
  {
    name: "Verify Arbitrators",
    route: "/admin/arbitrators",
  },
];

const Admin = () => {
  const router = useRouter();
  const adminData = useAdminContext();
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);

  if (!adminData) {
    router.push("/admin/login");
    return (
      <p>
        <Loader />
      </p>
    );
  }
  return (
    <MainLayout
      sidebarData={sidebarData}
      headerTitle={headerTitle}
      setToggleSidebar={setToggleSidebar}
      toggleSidebar={toggleSidebar}
    >
      <div>
        {adminData?.name}
        <h1>Land</h1>
      </div>
    </MainLayout>
  );
};

export default Admin;
