import { useRouter } from "next/router";
import React, { useState } from "react";
import { ButtonStyle } from "../../components/login/Button";

import { trpc } from "../../utils/trpc";
const ArbitratorRegister = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [registrationId, setRegistrationId] = useState("");
  const [adminId, setAdminId] = useState("");
  const { mutate, error } = trpc.useMutation(
    ["arbitrators.register-arbitrator"],
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: () => {
        router.push("/arbitrator/login");
      },
    }
  );

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    mutate({ name, description, password, registrationId, adminId });
  };
  return (
    <div className="min-h-screen w-full bg-primary text-white ">
      <div>
        <div className="p-4">
          <img
            src="/minister-of-finance-logo.svg"
            alt="minister-of-finance-logo"
            loading="lazy"
            width="250"
            height="150"
          />
        </div>

        <div className="relative top-20 flex h-full w-full flex-col items-center justify-center ">
          <div className="mb-5 flex-col items-center justify-center">
            <img
              alt="header-logo"
              src="/header-logo-title.svg"
              height="250"
              width="250"
              loading="lazy"
            />
          </div>

          <h1 className="font-bol text-xl">ARBITRATOR REGISTRATION</h1>
          <div className="ite container mx-auto flex w-full flex-col content-center items-center justify-center justify-self-center object-center ">
            {error && <p>{error.message}</p>}

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={"NAME"}
              className="my-3 min-w-[200px] rounded-md border border-white bg-transparent px-6  py-2 text-center  shadow placeholder:text-center  placeholder:text-sm placeholder:font-light  placeholder:sm:text-lg md:min-w-[330px] "
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={"DESCRIPTION"}
              className="my-3 min-w-[200px] rounded-md border border-white bg-transparent px-6  py-2 text-center  shadow placeholder:text-center  placeholder:text-sm placeholder:font-light  placeholder:sm:text-lg md:min-w-[330px] "
            />
            <input
              type="text"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              placeholder={"Admin Id"}
              className="my-3 min-w-[200px] rounded-md border border-white bg-transparent px-6  py-2 text-center  shadow placeholder:text-center  placeholder:text-sm placeholder:font-light  placeholder:sm:text-lg md:min-w-[330px] "
            />

            <input
              type="text"
              value={registrationId}
              onChange={(e) => setRegistrationId(e.target.value)}
              placeholder={"UserName"}
              className="my-3 min-w-[200px] rounded-md border border-white bg-transparent px-6  py-2 text-center  shadow placeholder:text-center  placeholder:text-sm placeholder:font-light  placeholder:sm:text-lg md:min-w-[330px] "
            />
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={"PASSWORD"}
              className="my-3 min-w-[200px] rounded-md border border-white bg-transparent px-6  py-2 text-center  shadow placeholder:text-center  placeholder:text-sm placeholder:font-light  placeholder:sm:text-lg md:min-w-[330px] "
            />
            <button className={ButtonStyle} onClick={(e) => handleSubmit(e)}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArbitratorRegister;
