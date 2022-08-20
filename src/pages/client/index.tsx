import { useRouter } from "next/router";
import React from "react";
import { Loader } from "../../components/loader/Loader";
import { useClientContext } from "../../context/client.context";

const Client = () => {
  const router = useRouter();
  const clientData = useClientContext();
  if (!clientData) {
    router.push("/client/login");
    return <p><Loader /></p>;
  }
  return (
    <div>
      <div>
        {clientData?.name}
        <h1>Land</h1>
      </div>
    </div>
  );
};

export default Client;
