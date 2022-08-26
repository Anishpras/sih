import { useRouter } from "next/router";
import React from "react";
import { Loader } from "../../components/loader/Loader";
import { useArbitratorContext } from "../../context/arbitrator.context";
import { trpc } from "../../utils/trpc";

const CauseList = () => {
  const { data } = trpc.useQuery(["arbitrators.get-cause-list"]);

  console.log(data);
  const router = useRouter();
  const arbitratorData = useArbitratorContext();
  if (!arbitratorData) {
    router.push("/arbitrator/login");
    return <Loader />;
  }

  return <div>cause-list</div>;
};

export default CauseList;
