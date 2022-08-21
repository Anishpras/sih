import { useRouter } from "next/router";
import React, { useState } from "react";
import MainLayout from "../../components/layout";
import { Loader } from "../../components/loader/Loader";
import Sidebar from "../../components/sidebar";
import { useArbitrationCentreContext } from "../../context/arbitrationCentre.context";

const headerData = [
  {
    name: "Admins",
    route: "/arbitration-centre/admins",
  },
  {
    name: "Add Cause",
    route: "/arbitration-centre/",
  },
];

const sidebarData = [
  {
    route: "/arbitration-centre",
    name: "Dashboard",
  },
];

const ArbitratorCentre = () => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);

  const router = useRouter();
  const arbitrationCentreData = useArbitrationCentreContext();
  if (!arbitrationCentreData) {
    router.push("/arbitration-centre/login");
    return (
      <p>
        <Loader />
      </p>
    );
  }
  return (
    // <div className="grid grid-cols-2 min-h-screen w-full bg-primary ">
    <MainLayout
      sidebarData={sidebarData}
      headerData={headerData}
      setToggleSidebar={setToggleSidebar}
      toggleSidebar={toggleSidebar}
    >
      <div>
        {arbitrationCentreData?.name}
        <h1>Land</h1>
        <div className="flex flex-wrap gap-5 justify-center items-center top-10 relative ">
          <div className="customShadow h-96 w-96 rounded-xl bg-white px-4 break-words overflow-clip py-2 font-Recursive	 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore quia maxime unde dolor, aliquam dolorem delectus tenetur repellat obcaecati velit neque, excepturi at in distinctio iste quos fugiat eum necessitatibus.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore quia maxime unde dolor, aliquam dolorem delectus tenetur repellat obcaecati velit neque, excepturi at in distinctio iste quos fugiat eum necessitatibus.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore quia maxime unde dolor, aliquam dolorem delectus tenetur repellat obcaecati velit neque, excepturi at in distinctio iste quos fugiat eum necessitatibus.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore quia maxime unde dolor, aliquam dolorem delectus tenetur repellat obcaecati velit neque, excepturi at in distinctio iste quos fugiat eum necessitatibus.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore quia maxime unde dolor, aliquam dolorem delectus tenetur repellat obcaecati velit neque, excepturi at in distinctio iste quos fugiat eum necessitatibus.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore quia maxime unde dolor, aliquam dolorem delectus tenetur repellat obcaecati velit neque, excepturi at in distinctio iste quos fugiat eum necessitatibus.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore quia maxime unde dolor, aliquam dolorem delectus tenetur repellat obcaecati velit neque, excepturi at in distinctio iste quos fugiat eum necessitatibus.
          </div>
          <div className="customShadow h-96 w-96 rounded-xl bg-white "></div>
          <div className="customShadow h-96 w-96 rounded-xl bg-white "></div>
          <div className="customShadow h-96 w-96 rounded-xl bg-white "></div>
          <div className="customShadow h-96 w-96 rounded-xl bg-white "></div>
          <div className="customShadow h-96 w-96 rounded-xl bg-white "></div>
          <div className="customShadow h-96 w-96 rounded-xl bg-white "></div>
          <div className="customShadow h-96 w-96 rounded-xl bg-white "></div>
        </div>
      </div>
    </MainLayout>
    // </div>
  );
};

export default ArbitratorCentre;
