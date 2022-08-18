import React from "react";
import { trpc } from "../../utils/trpc";

const AllAdminList = () => {
  const { data, error: allAdminError } = trpc.useQuery([
    "arbitration-centres.all-admins",
  ]);
  console.log(data);
  const { mutate, error: verifyAdminError } = trpc.useMutation(
    ["arbitration-centres.verify-admin"],
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: () => {
        window.location.reload();
      },
    }
  );
  const handleSubmit = (adminId: string) => {
    mutate({ adminId });
  };
  return (
    <div>
      {data?.map((admin) => {
        return (
          <div key={admin.id}>
            <p>{admin.name}</p>
            <p>{admin.username}</p>
            <p>{admin.verified.toString()}</p>
            <button onClick={() => handleSubmit(admin.id)}>Verify</button>
          </div>
        );
      })}
    </div>
  );
};

export default AllAdminList;
