import { useRouter } from "next/router";
import React from "react";
import Sidebar from "../../components/sidebar";
import { useArbitratorContext } from "../../context/arbitrator.context";

const Arbitrator = () => {
  const router = useRouter();
  const arbitratorData = useArbitratorContext();
  if (!arbitratorData) {
    router.push("/arbitrator/login");
    return <p>Loading...</p>;
  }
  return (
    <div>
      <div>
        {arbitratorData?.name}
        <h1>Arbitrator</h1>
      </div>
    </div>
  );
};

export default Arbitrator;
