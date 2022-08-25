/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useState } from "react";
import { trpc } from "../../utils/trpc";
import { useForm } from "react-hook-form";
import { Input } from "../../components/login/Input";
import { Button } from "../../components/login/Button";
import { useArbitratorContext } from "../../context/arbitrator.context";
import { Loader } from "../../components/loader/Loader";
import Link from "next/link";
import {
  formContainer,
  loginScreenContainer,
  loginScreenFormContainer,
} from "../../styles/custonStyle";

interface FormData {
  registrationId: string;
  password: string;
}

const LoginSubmit = ({
  registrationId,
  password,
}: {
  registrationId: string;
  password: string;
}) => {
  const router = useRouter();
  const { data, error, isLoading } = trpc.useQuery([
    "arbitrators.arbitrator-login",
    {
      registrationId: registrationId,
      password: password,
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

const ArbitratorLogin = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [loginData, setLoginData] = useState({} as FormData);
  const [verificationDone, setVerificationDone] = useState(false);

  const arbitratorData = useArbitratorContext();

  async function onSubmit(data: FormData) {
    setLoginData(data);
    setVerificationDone(true);
  }

  if (verificationDone) {
    return (
      <LoginSubmit
        registrationId={loginData.registrationId}
        password={loginData.password}
      />
    );
  }

  if (arbitratorData) {
    window.location.href = "/arbitrator";
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
          <h1 className="font-Montserrat text-2xl font-bold ">
            ARBITRATOR LOGIN
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={formContainer}>
          <Input
            type="text"
            register={register}
            placeholder="Enter your Registration Id"
            registerName={"registrationId"}
          />
          <Input
            type="password"
            register={register}
            placeholder="Enter your password"
            registerName={"password"}
          />
          <Button type="submit">Login</Button>
          <Link href="/arbitrator/register">
            <button
              type="button"
              className="relative -right-20 font-Montserrat text-xl underline"
            >
              Register ?
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ArbitratorLogin;
