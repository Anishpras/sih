import { useRouter } from "next/router";
import { useState } from "react";
import MainLayout from "../../components/layout";

import { Loader } from "../../components/loader/Loader";
import { useArbitratorContext } from "../../context/arbitrator.context";

const headerTitle = "Arbitrator";

const sidebarData = [
  {
    route: "/arbitrator",
    name: "Dashboard",
  },
  {
    name: "Admins",
    route: "/arbitrator/case",
  },
];

const Arbitrator = () => {
  const router = useRouter();
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);

  const arbitratorData = useArbitratorContext();
  if (!arbitratorData) {
    router.push("/arbitrator/login");
    return (
      <p>
        <Loader />
      </p>
    );
  }
  return (
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
  );
};

export default Arbitrator;
