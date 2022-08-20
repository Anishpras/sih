import React from "react";
import { trpc } from "../../../utils/trpc";

const AllArbitratorCase = () => {
  const { data, error } = trpc.useQuery(["arbitrators.get-cases"]);
  console.log(data);

  return <div></div>;
};

export default AllArbitratorCase;
