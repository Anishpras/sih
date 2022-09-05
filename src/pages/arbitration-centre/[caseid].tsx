import { useRouter } from "next/router";
import { useState } from "react";
import MainLayout from "../../components/layout";
import { Loader } from "../../components/loader/Loader";
import { CommonButton } from "../../components/login/Button";
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
  const { data: allCases, error: allCasesError } = trpc.useQuery([
    "arbitration-centres.all-cases",
  ]);
  const caseData = allCases?.filter((n) => n.id === router.query.caseid);

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

  if (caseData)
    return (
      <MainLayout
        logout={logOut}
        sidebarData={sidebarData}
        setToggleSidebar={setToggleSidebar}
        toggleSidebar={toggleSidebar}
        headerTitle={headerTitle}
      >
        <>
          <div>
            <h1 className="font-Montserrat text-lg">
              Name: <span>{caseData[0]?.name}</span>
            </h1>
            <h1 className="py-5 font-Montserrat text-lg">
              Description: <span>{caseData[0].description}</span>
            </h1>
            <a
              //  @ts-ignore
              href={caseData[0]?.award}
              className={CommonButton}
              target="_blank"
              rel="noreferrer"
            >
              <span>View Award</span>
            </a>
            <div className="py-5 font-Montserrat text-lg">
              <h1>Orders of the case </h1>

              <div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `If you haven't seen Game of Thrones, go watch it right now. If you have then you'll totally get why this Hodor themed lorem ipsum generator is just brilliant.

Hodor. Hodor hodor, hodor. Hodor hodor hodor hodor hodor. Hodor. Hodor! Hodor hodor, hodor; hodor hodor hodor. Hodor. Hodor hodor; hodor hodor - hodor, hodor, hodor hodor. Hodor, hodor. Hodor. Hodor, hodor hodor hodor; hodor hodor; hodor hodor hodor! Hodor hodor HODOR! Hodor hodor... Hodor hodor hodor...

In case you don't read Twitter, the news, or just can't get enough of The Apprentice host's legendary oration, try this Trump lorem ipsum generator on for size.

Lorem Ipsum is the single greatest threat. We are not - we are not keeping up with other websites. Lorem Ipsum best not make any more threats to your website. It will be met with fire and fury like the world has never seen. Does everybody know that pig named Lorem Ipsum? An ‘extremely credible source’ has called my office and told me that Barack Obama’s placeholder text is a fraud.

`,
                  }}
                />
              </div>
            </div>
          </div>
        </>
      </MainLayout>
      // </div>
    );
};

export default ArbitratorCentre;
