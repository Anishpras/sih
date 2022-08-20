import Link from "next/link";
import React, { useState } from "react";
import MainLayout from "../../../components/layout";
import { trpc } from "../../../utils/trpc";
const headerData = [
  {
    name: "Admns",
    route: "",
  },
  {
    name: "Admin",
    route: "",
  },
];

const sidebarData = [
  {
    route: "/arbitration-centre",
    name: "Client",
  },
];

const AllArbitratorCase = () => {
  const { data, error } = trpc.useQuery(["arbitrators.get-cases"]);
  console.log(data);
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);

  return (
    <MainLayout sidebarData={sidebarData} headerData={headerData} setToggleSidebar={setToggleSidebar} toggleSidebar={toggleSidebar}>
      <h1>All Cases</h1>

      {data?.map((singleCase) => {
        return (
          <div key={singleCase.id}>
            <p>{singleCase.name}</p>
            <Link href={`/arbitrator/cases/${singleCase.id}`}>
              <a>View Case</a>
            </Link>
          </div>
        );
      })}
    </MainLayout>
  );
};

export default AllArbitratorCase;
