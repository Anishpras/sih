import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainLayout from "../../components/layout";

import { Loader } from "../../components/loader/Loader";
import { ButtonStyle, CommonButton } from "../../components/login/Button";

import { useClientContext } from "../../context/client.context";
import { trpc } from "../../utils/trpc";
import { useSpeechSynthesisApi } from "../../utils/useSpeechSynthesisApi";

const headerTitle = "Party";

export const ArbitratorSidebarData = [
  {
    route: "/client",
    name: "Dashboard",
  },
];

const Client = () => {
  const router = useRouter();
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const {
    text,
    setText,
    isSpeaking,
    isPaused,
    isResumed,
    isEnded,
    speak,
    pause,
    resume,
    cancel,
  } = useSpeechSynthesisApi();
  const clientData = useClientContext();

  const { mutate: approveOrder, error: approveOrderError } = trpc.useMutation(
    ["clients.accept-order"],
    {
      onError: (error: any) => {
        console.log(error);
      },
      onSuccess: () => {
        console.log("Approved");
      },
    }
  );

  const { data, error, isLoading } = trpc.useQuery(["clients.get-case-data"]);

  const { mutate: denyOrder, error: denyOrderError } = trpc.useMutation(
    ["clients.deny-order"],
    {
      onError: (error: any) => {
        console.log(error);
      },
      onSuccess: () => {
        console.log("deny");
      },
    }
  );

  const handleApproveOrder = (e: any, orderId: string) => {
    e.preventDefault();
    approveOrder({ orderId: orderId });
  };
  const handleDenyOrder = (e: any, orderId: string) => {
    e.preventDefault();
    denyOrder({ orderId: orderId });
  };

  useEffect(() => {
    if (data) {
      setText(data?.orders[0]?.description);
    }
  }, [text, data, setText]);

  if (error) {
    console.log(error.message);
  }
  if (isLoading) {
    return (
      <p>
        <Loader />
      </p>
    );
  }
  if (!clientData || !data) {
    router.push("/client/login");
    return <Loader />;
  }
  console.log(data);
  return (
    <>
      <MainLayout
        logout="clientToken"
        sidebarData={ArbitratorSidebarData}
        setToggleSidebar={setToggleSidebar}
        toggleSidebar={toggleSidebar}
        headerTitle={headerTitle}>
        <div className="flex justify-center">
          <div className="flex flex-col items-start justify-center ">
            <h1 className="font-Montserrat ">
              <span className="font-Montserrat  text-gray-600 ">Name: </span>
              {data?.caseDetail?.name}
            </h1>
            <div>
              <p className="font-Montserrat">
                <span className="font-Montserrat text-gray-600 ">Order:</span>
                {data?.caseDetail?.description}
              </p>

              <div className="grid grid-cols-2">
                <button onClick={speak} className={`${ButtonStyle} mx-3 `}>
                  Speak
                </button>
                {isSpeaking ? "Speaking" : ""}
                <button onClick={pause} className={`${ButtonStyle} mx-3 `}>
                  pause
                </button>
                {isPaused ? "Paused" : ""}
                <button onClick={resume} className={`${ButtonStyle} mx-3 `}>
                  resume
                </button>
                {isResumed ? "Resumed" : ""}
                <button
                  onClick={cancel}
                  className={`${ButtonStyle} active: mx-3  `}>
                  cancel
                </button>
                {isEnded ? "Canceled" : ""}
              </div>
            </div>
            <a
              //  @ts-ignore
              href={data?.caseDetail?.award}
              className={CommonButton}
              target="_blank"
              rel="noreferrer">
              <span>View Award</span>
            </a>
            <div>
              <h1>Orders of the case </h1>
              {data?.orders.map((n, index) => {
                return (
                  <div key={index}>
                    <div dangerouslySetInnerHTML={{ __html: n.description }} />
                    <button onClick={(e) => handleApproveOrder(e, n.id)}>
                      Approve
                    </button>
                    <button onClick={(e) => handleDenyOrder(e, n.id)}>
                      Deny
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="my-3 flex flex-wrap">
              {data.annexure.map((n, index) => {
                return (
                  <div
                    key={index}
                    className="customShadow rounded-xl bg-white  py-3 px-5"
                  >
                    <h1>Annexure Name : {n.name}</h1>
                    <p>Annexure description : {n.description} </p>
                    <a
                      //  @ts-ignore
                      href={n.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>View Annexure</span>
                    </a>
                  </div>
                );
              })}
            </div>
            <a
              //  @ts-ignore
              href={data?.caseDetail?.award}
              className={CommonButton}
              target="_blank"
              rel="noreferrer"
            >
              <span>View Award</span>
            </a>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Client;
