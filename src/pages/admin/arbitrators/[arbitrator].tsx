import { useRouter } from "next/router";
import React, { useState } from "react";
import { trpc } from "../../../utils/trpc";

const SingleArbitrator = () => {
  const router = useRouter();
  const { arbitrator } = router.query;
  const [dateTime, setDateTime] = useState(new Date());
  const [caseId, setCaseId] = useState("");
  const [mode, setMode] = useState(false);
  const { mutate, error } = trpc.useMutation(["admin.add-hearing"], {
    onError: (error: any) => {
      console.log(error);
    },
    onSuccess: () => {
      router.reload();
    },
  });
  console.log(arbitrator);
  const handleSubmitHearing = (e: any) => {
    mutate({ dateTime, caseId, arbitratorId: arbitrator?.toString() });
  };
  return (
    <div>
      <h1>Single Arbitrator</h1>
      <input
        type="datetime"
        name=""
        id=""
        value={dateTime.toString()}
        onChange={(e) => setDateTime(new Date(e.target.value))}
      />
      <input
        type="text"
        value={caseId}
        onChange={(e) => setCaseId(e.target.value)}
      />
      <button onClick={(e) => handleSubmitHearing(e)}>Submit</button>
    </div>
  );
};

export default SingleArbitrator;
