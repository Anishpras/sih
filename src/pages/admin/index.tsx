import { useRouter } from "next/router";
import { useState } from "react";
import MainLayout from "../../components/layout";
import { Loader } from "../../components/loader/Loader";
import Modal from "../../components/modal";
import { useAdminContext } from "../../context/admin.context";
import { trpc } from "../../utils/trpc";

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
  {
    name: "Add Cause List",
    route: "/admin/arbitrators/cause-list",
  },
];

const Admin = () => {
  const router = useRouter();
  const adminData = useAdminContext();
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const {
    data,
    error: allAdminError,
    isLoading,
  } = trpc.useQuery(["admin.verified-admin"]);

  if (!adminData) {
    router.push("/admin/login");
    return <Loader />;
  }
  return (
    <>
      {data ? "" : <Modal name="Admin" data={data} />}
      <MainLayout
        logout="adminToken"
        sidebarData={sidebarData}
        headerTitle={headerTitle}
        setToggleSidebar={setToggleSidebar}
        toggleSidebar={toggleSidebar}>
        <div className="">
          {adminData?.username}
          <h1>Land</h1>
        </div>
      </MainLayout>
    </>
  );
};

export default Admin;
