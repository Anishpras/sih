import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainLayout from "../../components/layout";

import { Loader } from "../../components/loader/Loader";
import Modal from "../../components/modal";
import { useMediatorContext } from "../../context/mediator.context";
import { trpc } from "../../utils/trpc";

const headerTitle = "Mediator";

export const MediatorSidebarData = [
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

const Mediator = () => {
  const router = useRouter();
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);

  const mediatorData = useMediatorContext();
  const { data } = trpc.useQuery(["mediators.verify-mediator"]);
  if (!mediatorData) {
    router.push("/mediator/login");
    return <Loader />;
  }

  console.log(mediatorData);

  return (
    <>
      {data ? "" : <Modal name="Mediator" data={data} />}

      <MainLayout
        logout="mediatorToken"
        sidebarData={MediatorSidebarData}
        setToggleSidebar={setToggleSidebar}
        toggleSidebar={toggleSidebar}
        headerTitle={headerTitle}
      >
        <div>
          <div>
            {mediatorData?.name}
            <h1>Arbitrator</h1>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Mediator;
