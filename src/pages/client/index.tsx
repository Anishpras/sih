import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainLayout from "../../components/layout";

import { Loader } from "../../components/loader/Loader";
import Modal from "../../components/modal";
import { useClientContext } from "../../context/client.context";
import { trpc } from "../../utils/trpc";

const headerTitle = "Client";

export const ArbitratorSidebarData = [
  {
    route: "/arbitrator",
    name: "Dashboard",
  },
  {
    name: "All Cases",
    route: "/arbitrator/cases",
  },
  {
    name: "Add Cases",
    route: "/arbitrator/add-case",
  },
];

const Client = () => {
  const router = useRouter();
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const clientData = useClientContext();
  // const { data } = trpc.useQuery(["clients.login-client",{

  // }]);
  if (!clientData) {
    router.push("/client/login");
    return <Loader />;
  }

  return (
    <>
      <MainLayout
        sidebarData={ArbitratorSidebarData}
        setToggleSidebar={setToggleSidebar}
        toggleSidebar={toggleSidebar}
        headerTitle={headerTitle}
      >
        <div>
          <div>
            <h1>Client</h1>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Client;
