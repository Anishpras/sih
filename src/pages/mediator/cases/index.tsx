import Link from "next/link";
import { useState } from "react";
import { ArbitratorSidebarData } from "..";
import MainLayout from "../../../components/layout";
import { ButtonStyle } from "../../../components/login/Button";
import Modal from "../../../components/modal";
import { trpc } from "../../../utils/trpc";
const headerTitle = "Arbitrator";


const AllMediationCase = () => {
  const { data, error } = trpc.useQuery(["mediators.get-mediation-cases"]);
  console.log(data);
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const { data: VerifyArbitrator } = trpc.useQuery([
    "mediators.verify-mediator",
  ]);

  return (
    <>
      {VerifyArbitrator ? (
        ""
      ) : (
        <Modal name="Arbitrator" data={VerifyArbitrator} />
      )}

      <MainLayout
        logout="arbitratorToken"
        sidebarData={ArbitratorSidebarData}
        headerTitle={headerTitle}
        setToggleSidebar={setToggleSidebar}
        toggleSidebar={toggleSidebar}
      >
        <h1 className="font-Montserrat text-3xl font-bold">Your All Cases</h1>

        {data?.map((singleCase: any, index: number) => {
          return (
            <Link key={index} href={`/mediator/cases/${singleCase.id}`}>
              <button className={`${ButtonStyle} px-3 text-left `}>
                <h1> Case Name : {singleCase.name}</h1>
                <h2>Case Description:{singleCase.description}</h2>
              </button>
            </Link>
          );
        })}
      </MainLayout>
    </>
  );
};

export default AllMediationCase;
