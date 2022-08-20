import Link from "next/link";
import React from "react";
import { trpc } from "../../../utils/trpc";

const AllArbitratorCase = () => {
  const { data, error } = trpc.useQuery(["arbitrators.get-cases"]);
  console.log(data);

  return (
    <div>
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
    </div>
  );
};

export default AllArbitratorCase;
