import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { MediatorSidebarData } from "..";
import MainLayout from "../../../components/layout";
import { Loader } from "../../../components/loader/Loader";
import { ButtonStyle } from "../../../components/login/Button";
import Modal from "../../../components/modal";
import { useMediatorContext } from "../../../context/mediator.context";
import { trpc } from "../../../utils/trpc";
const headerTitle = "Mediator";

const AllMediationCase = () => {
  const { data, error } = trpc.useQuery(["mediators.get-mediation-cases"]);
  console.log(data);
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const { data: VerifyMediator } = trpc.useQuery(["mediators.verify-mediator"]);
  const router = useRouter();
  const mediatorData = useMediatorContext();
  if (!mediatorData) {
    router.push("/mediator/login");
    return <Loader />;
  }
  return (
    <>
      {VerifyMediator ? "" : <Modal name="Mediator" data={VerifyMediator} />}

      <MainLayout
        logout="mediatorToken"
        sidebarData={MediatorSidebarData}
        headerTitle={headerTitle}
        setToggleSidebar={setToggleSidebar}
        toggleSidebar={toggleSidebar}>
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
