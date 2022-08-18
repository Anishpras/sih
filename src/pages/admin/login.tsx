import { useRouter } from "next/router";
import React, { useState } from "react";

import { useForm } from "react-hook-form";
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
    return <p>Loading...</p>;
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
    <div className="bg-black text-white w-full min-h-screen ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="text-black"
          {...register("username")}
          placeholder="username"
        />
        <input
          className="text-black"
          {...register("password")}
          placeholder="Last name"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdminLogin;
