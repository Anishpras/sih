import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainLayout from "../../components/layout";

import { Loader } from "../../components/loader/Loader";

import { useMediationPartyContext } from "../../context/mediationParty.context";
import { trpc } from "../../utils/trpc";

const headerTitle = "Client";

export const ArbitratorSidebarData = [
  {
    route: "/mediator",
    name: "Dashboard",
  },
  {
    name: "All Cases",
    route: "/mediator/cases",
  },
  {
    name: "Add Cases",
    route: "/mediator/add-case",
  },
];

const Client = () => {
  const router = useRouter();
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const clientData = useMediationPartyContext();
  const { data, error, isLoading } = trpc.useQuery(["mediation-party.get-mediation-case-data"]);
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
    router.push("/mediation-client/login");
    return <Loader />;
  }

  return (
    <>
      <MainLayout
        logout="clientToken"
        sidebarData={ArbitratorSidebarData}
        setToggleSidebar={setToggleSidebar}
        toggleSidebar={toggleSidebar}
        headerTitle={headerTitle}
      >
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
