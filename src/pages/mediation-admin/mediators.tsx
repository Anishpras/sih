import React, { useState } from "react";
import MainLayout from "../../components/layout";
import { CommonButton } from "../../components/login/Button";
import Modal from "../../components/modal";
import { trpc } from "../../utils/trpc";

const headerData = [
  {
    name: "Verify Mediators",
    route: "/mediator-admin/mediators",
  },
];
const headerTitle = " Verify Mediators ";
const sidebarData = [
  {
    route: "/mediator-admin",
    name: "Dashboard",
  },
  {
    name: "Verify mediators",
    route: "/mediator-admin/mediators",
  },
];
const AllMediatorsList = () => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);

  const { data, error: allAdminError } = trpc.useQuery([
    "mediation-admin.all-mediators",
  ]);
  console.log(data);
  const { mutate, error: verifyAdminError } = trpc.useMutation(
    ["mediation-admin.verify-mediator"],
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: () => {
        window.location.reload();
      },
    }
  );
  const handleSubmit = (mediatorId: string) => {
    mutate({ mediatorId });
  };
  return (
    <>
      {data ? "" : <Modal name="Admin" data={data} />}
      <MainLayout
        logout="adminToken"
        sidebarData={sidebarData}
        headerTitle={headerTitle}
        setToggleSidebar={setToggleSidebar}
        toggleSidebar={toggleSidebar}
      >
        <div className="flex flex-wrap gap-10">
          {data?.map((mediator: any) => {
            return (
              <div
                key={mediator.id}
                className={`${
                  mediator.verified.toString() === "true"
                    ? " border-green-400"
                    : " border-red-400"
                }  customShadow max-w-full rounded-xl border bg-white px-10 py-2 font-Montserrat text-black `}
              >
                <p>mediator Name: {mediator.name}</p>
                <p>mediator Registration Id : {mediator.registrationId}</p>
                <button
                  className={`${
                    mediator.verified.toString() === "true"
                      ? "bg-slate-500 text-green-400"
                      : "hover:bg-hoverWhite"
                  } ${CommonButton}  my-2  bg-primaryWhite px-10 `}
                  disabled={mediator.verified.toString() === "true"}
                  onClick={() => handleSubmit(mediator.id)}
                >
                  {mediator.verified.toString() === "true"
                    ? "Verified"
                    : "Verify"}
                </button>
              </div>
            );
          })}
        </div>
      </MainLayout>
    </>
  );
};

export default AllMediatorsList;
