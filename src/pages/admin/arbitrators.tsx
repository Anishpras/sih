import React from "react";
import { trpc } from "../../utils/trpc";

const AllArbitratorsList = () => {
  const { data, error: allAdminError } = trpc.useQuery([
    "admin.all-arbitrators",
  ]);
  console.log(data);
  //   const { mutate, error: verifyAdminError } = trpc.useMutation(
  //     ["admin.verify-arbitrator"],
  //     {
  //       onError: (error) => {
  //         console.log(error);
  //       },
  //       onSuccess: () => {
  //         window.location.reload();
  //       },
  //     }
  //   );
  //   const handleSubmit = (adminId: string) => {
  //     mutate({ adminId });
  //   };
  return (
    <div>
      {/* {data?.map((admin) => {
        return (
          <div key={admin.id}>
            <p>{admin.name}</p>
            <p>{admin.username}</p>
            <p>{admin.verified.toString()}</p>
            <button onClick={() => handleSubmit(admin.id)}>Verify</button>
          </div>
        );
      })} */}
    </div>
  );
};

export default AllArbitratorsList;
