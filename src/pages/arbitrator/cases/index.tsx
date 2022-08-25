import Fuse from "fuse.js";
import Link from "next/link";
import { useState } from "react";
import { ArbitratorSidebarData } from "..";
import MainLayout from "../../../components/layout";
import { ButtonStyle } from "../../../components/login/Button";
import Modal from "../../../components/modal";
import { trpc } from "../../../utils/trpc";
const headerTitle = "Arbitrator";

const AllArbitratorCase = () => {
  const { data } = trpc.useQuery(["arbitrators.get-cases"]);

  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const { data: VerifyArbitrator } = trpc.useQuery([
    "arbitrators.verify-arbitrator",
  ]);

  // Fuse JS

  const options = {
    keys: ["name", "description"],
  };
  let fuse: any;
  if (data) {
    fuse = new Fuse(data, options);
  }

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
        <div className="flex flex-wrap">
          {data?.map((singleCase: any, index: number) => {
            console.log(singleCase);
            return (
              <Link key={index} href={`/arbitrator/cases/${singleCase.id}`}>
                <div
                  className={`${ButtonStyle} mx-1 cursor-pointer px-3 text-left `}
                >
                  <h1 className=                                                                                                                                                                                                                                                                                                                                                                                          "text-xl"> Case Name : {singleCase.name}</h1>
                  <h2 className="text-gray-500 ">
                    Case Description:{singleCase.description}
                  </h2>
                  <p className="text-gray-500">
                    {singleCase.award !== null && "completed"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </MainLayout>
    </>
  );
};

export default AllArbitratorCase;

/* 
import Link from "next/link";
import { useState } from "react";
import { ArbitratorSidebarData } from "..";
import MainLayout from "../../../components/layout";
import { ButtonStyle } from "../../../components/login/Button";
import Modal from "../../../components/modal";
import { trpc } from "../../../utils/trpc";
const headerTitle = "Arbitrator";

interface singleCaseProps {
  award: String;
  caseId: String;
  createdAt: Date;
  description: String;
  name: String;
  id: String;
}

const AllArbitratorCase = () => {
  const { data, error } = trpc.useQuery(["arbitrators.get-cases"]);
  console.log(data);
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const { data: VerifyArbitrator } = trpc.useQuery([
    "arbitrators.verify-arbitrator",
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
            <Link key={index} href={`/arbitrator/cases/${singleCase.id}`}>
              <button className={`${ButtonStyle} px-3 text-left mx-1 `}>
                <h1 className="text-xl"> Case Name : {singleCase.name}</h1>
                <h2 className="text-gray-500 ">Case Description:{singleCase.description}</h2>
              </button>
            </Link>
          );
        })}
      </MainLayout>
    </>
  );
};

export default AllArbitratorCase;
*/
