import React, { useState } from "react";
import MainLayout from "../../components/layout";
import { CommonButton } from "../../components/login/Button";
import { trpc } from "../../utils/trpc";

const headerData = [
  {
    name: "Verify Arbitrators",
    route: "/admin/arbitrators",
  },
];
const headerTitle = " Verify Arbitrators ";
const sidebarData = [
  {
    route: "/admin",
    name: "Dashboard",
  },
  {
    name: "Verify Arbitrators",
    route: "/admin/arbitrators",
  },
];
const AllArbitratorsList = () => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);

  const { data, error: allAdminError } = trpc.useQuery([
    "admin.all-arbitrators",
  ]);
  console.log(data);
  const { mutate, error: verifyAdminError } = trpc.useMutation(
    ["admin.verify-arbitrator"],
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: () => {
        window.location.reload();
      },
    }
  );
  const handleSubmit = (arbitratorId: string) => {
    mutate({ arbitratorId });
  };
  return (
    <MainLayout
      sidebarData={sidebarData}
      headerTitle={headerTitle}
      setToggleSidebar={setToggleSidebar}
      toggleSidebar={toggleSidebar}
    >
      <div className="flex flex-wrap gap-10">
        {data?.map((arbitrator) => {
          return (
            <div
              key={arbitrator.id}
              className={`${
                arbitrator.verified.toString() === "true"
                  ? " border-green-400"
                  : " border-red-400"
              }  customShadow max-w-full rounded-xl border bg-white px-10 py-2 font-Montserrat text-black `}
            >
              <p>Arbitrator Name: {arbitrator.name}</p>
              <p>Arbitrator Registration Id : {arbitrator.registrationId}</p>
              <button
                className={`${
                  arbitrator.verified.toString() === "true"
                    ? "bg-slate-500 text-green-400"
                    : "hover:bg-hoverWhite"
                } ${CommonButton}  my-2  bg-primaryWhite px-10 `}
                disabled={arbitrator.verified.toString() === "true"}
                onClick={() => handleSubmit(arbitrator.id)}
              >
                {arbitrator.verified.toString() === "true"
                  ? "Verified"
                  : "Verify"}
              </button>
            </div>
          );
        })}
      </div>
    </MainLayout>
  );
};

export default AllArbitratorsList;
