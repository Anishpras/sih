/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ButtonStyle } from "../../components/login/Button";
import { CustomInputStyle } from "../../components/login/Input";
import {
  loginFormHeader,
  loginScreenContainer,
  loginScreenFormContainer,
} from "../../styles/custonStyle";

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
          <h1 className="font-Montserrat text-2xl font-bold ">
          ARBITRATOR REGISTRATION
          </h1>
        </div>
        {/* <div className="relative pt-20">
          <h1 className="font-Montserrat text-2xl font-bold ">
          
          </h1>
        </div> */}
        <form className=" container mx-auto flex w-full flex-col content-center items-center justify-center justify-self-center object-center ">
          {error && <p>{error.message}</p>}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={"NAME"}
            className={CustomInputStyle}
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={"DESCRIPTION"}
            className={CustomInputStyle}
          />
          <input
            type="text"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            placeholder={"Admin Id"}
            className={CustomInputStyle}
          />
          <input
            type="text"
            value={registrationId}
            onChange={(e) => setRegistrationId(e.target.value)}
            placeholder={"UserName"}
            className={CustomInputStyle}
          />
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={"PASSWORD"}
            className={CustomInputStyle}
          />{" "}
          
          <button className={ButtonStyle} onClick={(e) => handleSubmit(e)}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default ArbitratorRegister;
