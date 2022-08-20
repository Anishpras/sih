import { useRouter } from "next/router";
import React from "react";
import { Loader } from "../../components/loader/Loader";
import { useAdminContext } from "../../context/admin.context";

const Admin = () => {
  const router = useRouter();
  const adminData = useAdminContext();
  if (!adminData) {
    router.push("/admin/login");
    return <p><Loader /></p>;
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
