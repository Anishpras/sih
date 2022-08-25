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
  const { data: arbitrationAllCasesData, error } = trpc.useQuery([
    "arbitration-centres.all-arbitration-centre-cases",
  ]);
  console.log(data);
  console.log(arbitrationAllCasesData);
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

        <div className="relative top-10 flex flex-wrap items-center justify-center gap-5 ">
          <div className="customShadow h-96 w-96 overflow-clip break-words rounded-xl bg-white px-4 py-2 font-Recursive	 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore quia
            maxime unde dolor, aliquam dolorem delectus tenetur repellat
            obcaecati velit neque, excepturi at in distinctio iste quos fugiat
            eum necessitatibus. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Dolore quia maxime unde dolor, aliquam dolorem
            delectus tenetur repellat obcaecati velit neque, excepturi at in
            distinctio iste quos fugiat eum necessitatibus. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Dolore quia maxime unde
            dolor, aliquam dolorem delectus tenetur repellat obcaecati velit
            neque, excepturi at in distinctio iste quos fugiat eum
            necessitatibus. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Dolore quia maxime unde dolor, aliquam dolorem delectus
            tenetur repellat obcaecati velit neque, excepturi at in distinctio
            iste quos fugiat eum necessitatibus. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Dolore quia maxime unde dolor, aliquam
            dolorem delectus tenetur repellat obcaecati velit neque, excepturi
            at in distinctio iste quos fugiat eum necessitatibus. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Dolore quia maxime unde
            dolor, aliquam dolorem delectus tenetur repellat obcaecati velit
            neque, excepturi at in distinctio iste quos fugiat eum
            necessitatibus. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Dolore quia maxime unde dolor, aliquam dolorem delectus
            tenetur repellat obcaecati velit neque, excepturi at in distinctio
            iste quos fugiat eum necessitatibus.
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
