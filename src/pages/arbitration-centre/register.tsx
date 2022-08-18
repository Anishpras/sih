import { useRouter } from "next/router";
import React, { useState } from "react";

import { trpc } from "../../utils/trpc";
const ArbitrationCentreRegister = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
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
    mutate({ name, description, password });
  };
  return (
    <div>
      <div>
        <h1>Arbitration Centre</h1>
        {error && <p>{error.message}</p>}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={(e) => handleSubmit(e)}>Submit</button>
      </div>
    </div>
  );
};

export default ArbitrationCentreRegister;
