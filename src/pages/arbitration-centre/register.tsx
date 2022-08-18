import { useRouter } from "next/router";
import React, { useState } from "react";

import { trpc } from "../../utils/trpc";
const ArbitrationCentreRegister = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [arbitrationCentreId, setArbitrationCentreId] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, error } = trpc.useMutation(
    ["arbitration-centres.register-arbitration-centre"],
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: () => {
        router.push("/arbitration-centre/login");
      },
    }
  );

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    mutate({ name, description, password, arbitrationCentreId });
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
          value={description}
          placeholder={"Description"}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          value={arbitrationCentreId}
          placeholder={"Arbitration Centre Id"}
          onChange={(e) => setArbitrationCentreId(e.target.value)}
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

export default ArbitrationCentreRegister;
