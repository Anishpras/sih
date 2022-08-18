import { useRouter } from "next/router";
import React from "react";
import { useArbitratorContext } from "../../context/arbitrator.context";

const Land = () => {
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
        <h1>Land</h1>
      </div>
    </div>
  );
};

export default Land;
