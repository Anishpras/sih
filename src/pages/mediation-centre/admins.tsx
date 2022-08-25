import { useRouter } from "next/router";
import React, { useState } from "react";
import MainLayout from "../../components/layout";
import { CommonButton } from "../../components/login/Button";
import { trpc } from "../../utils/trpc";
const headerData = [
  {
    name: "Dashboard",
    route: "/mediation-centre",
  },
];

const headerTitle = "Admins";
const sidebarData = [
  {
    route: "/mediation-centre",
    name: "Dashboard",
  },
  {
    name: "Admins",
    route: "/mediation-centre/admins",
  },
  {
    name: "Add Cause",
    route: "/mediation-centre/",
  },
];
const AllAdminList = () => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);

  const { data, error: allAdminError } = trpc.useQuery([
    "mediation-centres.all-mediation-admins",
  ]);
  console.log(data);
  const { mutate, error: verifyAdminError } = trpc.useMutation(
    ["mediation-centres.verify-mediation-admin"],
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: () => {
        window.location.reload();
      },
    }
  );
  const handleSubmit = (mediationAdminId: string) => {
    mutate({ mediationAdminId });
  };

  return (
    <MainLayout
      logout="mediationCentreToken"
      sidebarData={sidebarData}
      setToggleSidebar={setToggleSidebar}
      toggleSidebar={toggleSidebar}
      headerTitle={headerTitle}
    >
      <>
        <div className="flex flex-wrap gap-10">
          {data?.map((admin) => {
            return (
              <div
                key={admin.id}
                className={`${
                  admin.verified.toString() === "true"
                    ? " border-green-400"
                    : " border-red-400"
                }  customShadow max-w-full rounded-xl border bg-white px-10 py-2 font-Montserrat text-black `}
              >
                <p className="text-xl">Admin Name: {admin.name}</p>
                <p>Admin Username: {admin.username}</p>
                <button
                  className={`${
                    admin.verified.toString() === "true"
                      ? "bg-slate-500 text-green-400"
                      : "hover:bg-hoverWhite"
                  } ${CommonButton} my-2  bg-primaryWhite  px-10  `}
                  disabled={admin.verified.toString() === "true"}
                  onClick={() => handleSubmit(admin.id)}
                >
                  {admin.verified.toString() === "true" ? "Verified" : "Verify"}
                </button>
              </div>
            );
          })}
        </div>
      </>
    </MainLayout>
  );
};

export default AllAdminList;
