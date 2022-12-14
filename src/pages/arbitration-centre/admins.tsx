import { useRouter } from "next/router";
import { useState } from "react";
import MainLayout from "../../components/layout";
import { Loader } from "../../components/loader/Loader";
import { CommonButton } from "../../components/login/Button";
import { useArbitrationCentreContext } from "../../context/arbitrationCentre.context";
import { trpc } from "../../utils/trpc";

const headerTitle = "Admins";
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
const AllAdminList = () => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);

  const { data } = trpc.useQuery(["arbitration-centres.all-admins"]);

  const { mutate } = trpc.useMutation(["arbitration-centres.verify-admin"], {
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      window.location.reload();
    },
  });
  const handleSubmit = (adminId: string) => {
    mutate({ adminId });
  };
  const router = useRouter();
  const arbitrationCentreData = useArbitrationCentreContext();
  if (!arbitrationCentreData) {
    router.push("/arbitration-centre/login");
    return (
      <p>
        <Loader />
      </p>
    );
  }
  return (
    <MainLayout
      logout="arbitrationCentreToken"
      sidebarData={sidebarData}
      setToggleSidebar={setToggleSidebar}
      toggleSidebar={toggleSidebar}
      headerTitle={headerTitle}>
      <>
        <div className="flex flex-wrap gap-10">
          {data?.map((admin: any) => {
            return (
              <div
                key={admin.id}
                className={`${
                  admin.verified.toString() === "true"
                    ? " border-green-400"
                    : " border-red-400"
                }  customShadow max-w-full rounded-xl border bg-white px-10 py-2 font-Montserrat text-black `}>
                <p className="text-xl">Admin Name: {admin.name}</p>
                <p>Admin Username: {admin.username}</p>
                <button
                  className={`${
                    admin.verified.toString() === "true"
                      ? "bg-slate-500 text-green-400"
                      : "hover:bg-hoverWhite"
                  } ${CommonButton} my-2  bg-primaryWhite  px-10  `}
                  disabled={admin.verified.toString() === "true"}
                  onClick={() => handleSubmit(admin.id)}>
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
