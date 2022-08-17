import { useRouter } from "next/router";
import React from "react";
import { useArbitrationCentreContext } from "../../context/arbitrationCentre.context";

const Land = () => {
  const router = useRouter();
  const arbitrationCentreData = useArbitrationCentreContext();
  if (!arbitrationCentreData) {
    router.push("/arbitration-centre/login");
    return <p>Loading...</p>;
  }
  return (
    <div>
      <div>
        {arbitrationCentreData?.name}
        <h1>Land</h1>
      </div>
    </div>
  );
};

export default Land;
