/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { Loader } from "../../components/loader/Loader";
import { Button } from "../../components/login/Button";
import { Input } from "../../components/login/Input";
import { useAdminContext } from "../../context/admin.context";
import { useArbitrationCentreContext } from "../../context/arbitrationCentre.context";
import { trpc } from "../../utils/trpc";

interface FormData {
  username: string;
  password: string;
}

const LoginSubmit = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const { data, error, isLoading } = trpc.useQuery([
    "admin.login-admin",
    {
      username: username,
      password: password,
    },
  ]);
  if (error) {
    console.log(error.message);
  }
  if (isLoading) {
    return <p><Loader /></p>;
  }
  if (data) {
    window.location.reload();
  }
  console.log("Login Done");
  return <p>Redirecting</p>;
};

const AdminLogin = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [loginData, setLoginData] = useState({} as FormData);
  const [verificationDone, setVerificationDone] = useState(false);
  const router = useRouter();
  const adminData = useAdminContext();

  async function onSubmit(data: FormData) {
    setLoginData(data);
    setVerificationDone(true);
  }
  if (verificationDone) {
    return (
      <LoginSubmit
        username={loginData.username}
        password={loginData.password}
      />
    );
  }
  if (adminData) {
    router.push("/admin");
  }
  return (
    <div className="min-h-screen w-full bg-primary text-white ">
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
      <div className="mb-5 flex-col justify-center items-center">
          <img
            alt="header-logo"
            src="/header-logo.svg"
            height="100"
            width="100"
            loading="lazy"
            className="ml-14"
          />
          <h3>Arbitration & Mediation Centre</h3>
        </div>
        <div>
          <h1 className="font-bol text-xl">ADMIN LOGIN</h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="ite container mx-auto flex w-full flex-col content-center items-center justify-center justify-self-center object-center "
        >
          <Input
            type="text"
            register={register}
            placeholder="Enter your username"
            registerName={"username"}
          />
          <Input
            type="text"
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

export default AdminLogin;
