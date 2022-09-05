import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import MainLayout from "../../components/layout";
import { Loader } from "../../components/loader/Loader";
import { useArbitrationCentreContext } from "../../context/arbitrationCentre.context";
import { trpc } from "../../utils/trpc";

const headerTitle = "Arbitration Center ";

const ArbitratorCentreData = [
  {
    name: "Khagaul Center",
    id: "Khc-123",
    noOfArbitrator: 5,
  },
  {
    name: "Danapur Center",
    id: "Dp-123",
    noOfArbitrator: 10,
  },
  {
    name: "Patna Center",
    id: "P-123",
    noOfArbitrator: 15,
  },
  {
    name: "Bihar Sharif Center",
    id: "Bsc-123",
    noOfArbitrator: 20,
  },
];

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
  // const animeData = allCases.filter((n) => n.caseId === router.params.caseid);
  const { mutate, error } = trpc.useMutation(["arbitration-centres.log-out"], {
    onError: (error: any) => {
      console.log(error);
    },
    onSuccess: () => {
      router.push("/arbitration-centre/login");
    },
  });
  if (!arbitrationCentreData) {
    router.push("/arbitration-centre/login");
    return (
      <p>
        <Loader />
      </p>
    );
  }
  const logOut = () => {
    mutate({ arbitrationCentreId: data?.arbitrationCentreId });
    document.cookie =
      "arbitrationCentreToken" + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.reload();
  };
  return (
    <MainLayout
      logout={logOut}
      sidebarData={sidebarData}
      setToggleSidebar={setToggleSidebar}
      toggleSidebar={toggleSidebar}
      headerTitle={headerTitle}
    >
      <div className="font-Montserrat">
        <h1 className=" font-bold">Admins</h1>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 ">
          {ArbitratorCentreData.map((n, index) => {
            return (
              <div
                key={index}
                className="max-w-sm rounded-xl bg-white px-3 py-3  cursor-pointer "
              >
                <h1 className="text-xl font-bold ">Admin Name : {n.name}</h1>
                <p>Admin Id : {n.id}</p>
                <p>No of Arbitrator : {n.noOfArbitrator}</p>
              </div>
            );
          })}
        </div>

        <div>
          <h1 className=" py-3 font-bold">All Cases</h1>
          <div></div>
        </div>
        {allCases?.map((caseData, idx) => {
          console.log(caseData);
          return (
            <Link key={idx} href={`/arbitration-centre/${caseData.id}`}>
              <div className="max-w-sm rounded-xl bg-white px-3 py-3 cursor-pointer ">
                <h1 className="text-xl font-bold ">{caseData.name}</h1>
                <p>{caseData.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </MainLayout>
    // </div>
  );
};

export default ArbitratorCentre;
