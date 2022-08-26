import { useRouter } from "next/router";
import { useState } from "react";
import MainLayout from "../../components/layout";
import { Loader } from "../../components/loader/Loader";
import { useArbitrationCentreContext } from "../../context/arbitrationCentre.context";
import { trpc } from "../../utils/trpc";

const headerTitle = "Arbitration Center ";

const sidebarData = [
  {
    route: "/arbitration-centre",
    name: "Dashboard",
  },
  {
    name: "Admins",
    route: "/arbitration-centre/admins",
  },
];

const ArbitratorCentre = () => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);

  const router = useRouter();
  const arbitrationCentreData = useArbitrationCentreContext();
  //all-admins
  const { data, error: allAdminError } = trpc.useQuery([
    "arbitration-centres.detail",
  ]);
  const { data: allCases, error: allCasesError } = trpc.useQuery([
    "arbitration-centres.all-cases",
  ]);
  console.log(allCases);
  console.log(data);
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
      logout="arbitrationCentreToken"
      sidebarData={sidebarData}
      setToggleSidebar={setToggleSidebar}
      toggleSidebar={toggleSidebar}
      headerTitle={headerTitle}>
      <div>
        {/* <button onClick={cookieRemove}>Remove Cookie</button> */}

        <div className="relative top-10 mb-16 flex flex-wrap items-center justify-center gap-5">
          <h1>
            Here all the Arbitration centre Admins and Cases under the
            Arbitration Centre will appear.
          </h1>
        </div>
      </div>
      {allCases?.map((caseData, idx) => {
        return (
          <div key={idx}>
            <h1>{caseData.name}</h1>
            <h1>{caseData.description}</h1>
          </div>
        );
      })}
    </MainLayout>
    // </div>
  );
};

export default ArbitratorCentre;
