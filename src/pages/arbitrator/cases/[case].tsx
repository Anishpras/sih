import React from "react";
import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";
const SingleCase = () => {
  const router = useRouter();
  const { case: caseId } = router.query;

  const { data, error } = trpc.useQuery([
    "arbitrators.get-single-case",
    { caseId: caseId?.toString() },
  ]);
  console.log(data);
  return (
    <div>
      <h1>Single Case</h1>
    </div>
  );
};

export default SingleCase;
