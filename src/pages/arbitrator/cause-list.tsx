import React from "react";
import { trpc } from "../../utils/trpc";

const CauseList = () => {
  const { data } = trpc.useQuery(["arbitrators.get-cause-list"]);

  console.log(data);

  return <div>cause-list</div>;
};

export default CauseList;
