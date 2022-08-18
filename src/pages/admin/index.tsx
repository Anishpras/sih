import { useRouter } from "next/router";
import React from "react";
import { useAdminContext } from "../../context/admin.context";

const Admin = () => {
  const router = useRouter();
  const adminData = useAdminContext();
  if (!adminData) {
    router.push("/admin/login");
    return <p>Loading...</p>;
  }
  return (
    <div>
      <div>
        {adminData?.name}
        <h1>Land</h1>
      </div>
    </div>
  );
};

export default Admin;
