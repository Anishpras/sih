/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ButtonStyle } from "../../components/login/Button";
import { CustomInputStyle } from "../../components/login/Input";
import {
  loginScreenContainer,
  loginScreenFormContainer,
} from "../../styles/custonStyle";

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
    <div className={loginScreenContainer}>
      <div className="relative lg:bg-black ">
        <div className="relative h-full w-full lg:hidden">
          <div className="absolute overflow-hidden">
            <svg
              width="1024"
              height="675"
              viewBox="0 0 1024 675"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0V453.692C0 453.692 275.787 415.299 512 562.081C748.213 708.864 1024 670.471 1024 670.471V0.468262L0 0Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
        <div className="relative p-4">
          <img
            src="/minister-of-finance-logo.svg"
            alt="minister-of-finance-logo"
            loading="lazy"
            width="250"
            height="150"
          />
          <div className="flex justify-center">
            <img
              alt="header-logo"
              src="/header-logo-title.svg"
              height="250"
              width="250"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <div className={loginScreenFormContainer}>
        <div className="relative pt-32">
          <h1 className="font-Montserrat text-2xl font-bold uppercase ">
            Arbitration Centre
          </h1>
        </div>

        <form className=" container mx-auto flex w-full flex-col content-center items-center justify-center justify-self-center object-center ">
          {error && <p>{error.message}</p>}
          <input
            type="text"
            value={name}
            placeholder={"Name"}
            className={CustomInputStyle}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            value={description}
            placeholder={"Description"}
            className={CustomInputStyle}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            value={arbitrationCentreId}
            placeholder={"Arbitration Centre Id"}
            className={CustomInputStyle}
            onChange={(e) => setArbitrationCentreId(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder={"Password"}
            className={CustomInputStyle}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={ButtonStyle} onClick={(e) => handleSubmit(e)}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default ArbitrationCentreRegister;
