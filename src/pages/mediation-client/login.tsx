/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useState } from "react";
import { trpc } from "../../utils/trpc";
import { useForm } from "react-hook-form";
import { Input } from "../../components/login/Input";
import { Button } from "../../components/login/Button";
import { Loader } from "../../components/loader/Loader";
import Link from "next/link";
import {
  formContainer,
  loginScreenContainer,
  loginScreenFormContainer,
} from "../../styles/custonStyle";
import { useMediationPartyContext } from "../../context/mediationParty.context";

interface FormData {
  username: string;
  password: string;
  name: string;
}

const LoginSubmit = ({ username, password, name }: FormData) => {
  const router = useRouter();
  const { data, error, isLoading } = trpc.useQuery([
    "mediation-party.login-mediation-party",
    {
      username: username,
      password: password,
      name: name,
    },
  ]);
  //   console.log(name, password, "name");
  if (error) {
    console.log(error.message);
  }
  if (isLoading) {
    return (
      <p>
        <Loader />
      </p>
    );
  }
  if (data) {
    window.location.reload();
  }
  console.log("Login Done");
  return <p>Redirecting</p>;
  // router.push("/arbitrator");
};

const ClientLogin = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [loginData, setLoginData] = useState({} as FormData);
  const [verificationDone, setVerificationDone] = useState(false);

  const clientData = useMediationPartyContext();

  async function onSubmit(data: FormData) {
    setLoginData(data);
    setVerificationDone(true);
  }

  if (verificationDone) {
    return (
      <LoginSubmit
        username={loginData.username}
        password={loginData.password}
        name={loginData.name}
      />
    );
  }

  if (clientData) {
    window.location.href = "/mediator-client";
  }
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
              height="500"
              width="500"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <div className={loginScreenFormContainer}>
        <div className="relative pt-32">
          <h1 className="font-Montserrat text-2xl font-bold ">Client LOGIN</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={formContainer}>
          <Input
            type="text"
            register={register}
            placeholder="Enter your username"
            registerName={"username"}
          />
          <Input
            type="name"
            register={register}
            placeholder="Enter your Name"
            registerName={"name"}
          />
          <Input
            type="password"
            register={register}
            placeholder="Enter your password"
            registerName={"password"}
          />
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
};

export default ClientLogin;
