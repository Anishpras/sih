import Link from "next/link";
import React from "react";
import { trpc } from "../../../utils/trpc";

const CauseList = () => {
  const { data } = trpc.useQuery(["admin.all-arbitrators"]);

  return (
    <div>
      <h1>Cause List</h1>
      {data?.map((arbitrator: any) => {
        return (
          <div key={arbitrator.id}>
            <Link href={`/admin/arbitrators/${arbitrator.id}`}>
              <div>{arbitrator.name}</div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default CauseList;
