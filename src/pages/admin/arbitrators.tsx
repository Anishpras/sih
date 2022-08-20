import React from "react";
import { trpc } from "../../utils/trpc";

const AllArbitratorsList = () => {
  const { data, error: allAdminError } = trpc.useQuery([
    "admin.all-arbitrators",
  ]);
  console.log(data);
    const { mutate, error: verifyAdminError } = trpc.useMutation(
      ["admin.verify-arbitrator"],
      {
        onError: (error) => {
          console.log(error);
        },
        onSuccess: () => {
          window.location.reload();
        },
      }
    );
    const handleSubmit = (arbitratorId: string) => {
      mutate({ arbitratorId });
    };
  return (
    <div>
      {data?.map((arbitrator) => {
        return (
          <div key={arbitrator.id}>
            <p>{arbitrator.name}</p>
            <p>{arbitrator.verified.toString()}</p>
            <button onClick={() => handleSubmit(arbitrator.id)}>Verify</button>
          </div>
        );
      })}
    </div>
  );
};

export default AllArbitratorsList;
