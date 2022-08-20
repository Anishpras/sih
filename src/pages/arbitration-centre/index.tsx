import { useRouter } from "next/router";
import React, { useState } from "react";
import MainLayout from "../../components/layout";
import Sidebar from "../../components/sidebar";
import { useArbitrationCentreContext } from "../../context/arbitrationCentre.context";

const headerData = [
  {
    name: "Add user",
    route: "/arbitration-centre/",
  },
  {
    name: "Add Cases",
    route: "/arbitration-centre/",
  },
];

const sidebarData = [
  {
    route: "/arbitration-centre",
    name: "Client",
  },
];

const ArbitratorCentre = () => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);

  const router = useRouter();
  const arbitrationCentreData = useArbitrationCentreContext();
  if (!arbitrationCentreData) {
    router.push("/arbitration-centre/login");
    return <p>Loading...</p>;
  }
  return (
    // <div className="grid grid-cols-2 min-h-screen w-full bg-primary ">
    <MainLayout sidebarData={sidebarData} headerData={headerData} setToggleSidebar={setToggleSidebar} toggleSidebar={toggleSidebar}>
      <div>
        {arbitrationCentreData?.name}
        <h1>Land</h1>
      </div>
    </MainLayout>
    // </div>
  );
};

export default ArbitratorCentre;
