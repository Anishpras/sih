import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainLayout from "../../components/layout";

import { Loader } from "../../components/loader/Loader";
import Modal from "../../components/modal";
import { useArbitratorContext } from "../../context/arbitrator.context";
import { trpc } from "../../utils/trpc";

const headerTitle = "Arbitrator";

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

const Arbitrator = () => {
  const router = useRouter();
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);

  const arbitratorData = useArbitratorContext();
  const { data } = trpc.useQuery(["arbitrators.verify-arbitrator"]);
  if (!arbitratorData) {
    router.push("/arbitrator/login");
    return <Loader />;
  }

  console.log(arbitratorData);

  return (
    <>
      {data ? "" : <Modal name="Arbitrator" data={data} />}

      <MainLayout
        sidebarData={ArbitratorSidebarData}
        setToggleSidebar={setToggleSidebar}
        toggleSidebar={toggleSidebar}
        headerTitle={headerTitle}>
        <div>
          <div>
            {arbitratorData?.name}
            <h1>Arbitrator</h1>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Arbitrator;
