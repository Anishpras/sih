import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainLayout from "../../components/layout";

import { Loader } from "../../components/loader/Loader";

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
  const { data, error, isLoading } = trpc.useQuery(["clients.get-case-data"]);
  if (error) {
    console.log(error.message);
  }
  if (isLoading) {
    return (
      <p>
        <Loader />
      </p>
    );
  }
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
        headerTitle={headerTitle}>
        <div>
          <div>
            <h1>Party</h1>
            <div>{JSON.stringify(data)}</div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Client;
