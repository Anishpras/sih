import { useRouter } from "next/router";
import React, { useState } from "react";

import { trpc } from "../../utils/trpc";
const AdminRegister = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [arbitrationCentreId, setArbitrationCentreId] = useState("");
  const [username, setUsername] = useState("");
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, error } = trpc.useMutation(["admin.admin-register"], {
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      router.push("/admin/login");
    },
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    mutate({ name, username, arbitrationCentreId,adminId, password });
  };
  return (
    <div>
      <div>
        <h1>Arbitration Centre</h1>
        {error && <p>{error.message}</p>}
        <input
          type="text"
          value={name}
          placeholder={"Name"}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={arbitrationCentreId}
          placeholder={"Arbitration Centre Id"}
          onChange={(e) => setArbitrationCentreId(e.target.value)}
        />
        <input
          type="text"
          value={username}
          placeholder={"Username"}
          onChange={(e) => setUsername(e.target.value)}
        />
         <input
          type="text"
          value={adminId}
          placeholder={"AdminId"}
          onChange={(e) => setAdminId(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder={"Password"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={(e) => handleSubmit(e)}>Submit</button>
      </div>
    </div>
  );
};

export default AdminRegister;
