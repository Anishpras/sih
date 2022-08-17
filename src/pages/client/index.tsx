import React, { useState } from "react";

import { trpc } from "../../utils/trpc";
const Client = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, error } = trpc.useMutation(
    ["arbitrators.register-arbitrator"],
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: () => {
        console.log("Registration Done");
      },
    }
  );

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    mutate({ name, description, password, registrationId: "123" });
  };
  return (
    <div>
      <div>
        <h1>Client</h1>
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

export default Client;
