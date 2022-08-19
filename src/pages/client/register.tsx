import { useRouter } from "next/router";
import React, { useState } from "react";

import { trpc } from "../../utils/trpc";
const ClientRegister = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, error } = trpc.useMutation(["clients.register-client"], {
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      router.push("/client/login");
    },
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    mutate({ name, username, password });
  };
  return (
    <div>
      <div>
        <h1>Client</h1>
        {error && <p>{error.message}</p>}


        <div>
          <h1 className="font-bol text-xl">CLIENT </h1>
        </div>



        <div className="ite container mx-auto flex w-full flex-col content-center items-center justify-center justify-self-center object-center ">
<input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={(e) => handleSubmit(e)}>Submit</button>


        </div>
        
      </div>
    </div>
  );
};

export default ClientRegister;
