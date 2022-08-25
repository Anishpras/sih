import { useRouter } from "next/router";
import { useState } from "react";
import MainLayout from "../../components/layout";
import { Loader } from "../../components/loader/Loader";
import Modal from "../../components/modal";
import { useMediationAdminContext } from "../../context/mediationAdmin.context";
import { trpc } from "../../utils/trpc";

const headerTitle = "Admin ";
const sidebarData = [
  {
    route: "/mediation-admin",
    name: "Dashboard",
  },
  {
    name: "Verify Arbitrators",
    route: "/mediation-admin/mediators",
  },
];

const Admin = () => {
  const router = useRouter();
  const adminData = useMediationAdminContext();
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const {
    data,
    error: allAdminError,
    isLoading,
  } = trpc.useQuery(["mediation-admin.verified-mediation-admin"]);

  if (!adminData) {
    router.push("/mediation-admin/login");
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
        toggleSidebar={toggleSidebar}
      >
        <div className="">
          {adminData?.username}
          <h1>Land</h1>
        </div>
      </MainLayout>
    </>
  );
};

export default Admin;
