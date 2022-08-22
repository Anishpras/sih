import { useRouter } from "next/router";
import { useState } from "react";
import MainLayout from "../../components/layout";

import { Loader } from "../../components/loader/Loader";
import Modal from "../../components/modal";
import { useArbitratorContext } from "../../context/arbitrator.context";
import { trpc } from "../../utils/trpc";

const headerTitle = "Arbitrator";

const sidebarData = [
  {
    route: "/arbitrator",
    name: "Dashboard",
  },
  {
    name: "Admins",
    route: "/arbitrator/cases",
  },
  {
    name:"Add Cases",
    route:"/add-case"
  }
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
  return (
    <>
      {data ? "" : <Modal />}

      <MainLayout
        sidebarData={sidebarData}
        setToggleSidebar={setToggleSidebar}
        toggleSidebar={toggleSidebar}
        headerTitle={headerTitle}
      >
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
