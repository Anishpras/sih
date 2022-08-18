import { useRouter } from "next/router";
import React, { useState } from "react";
import { trpc } from "../../utils/trpc";
import { useForm } from "react-hook-form";

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
  const router = useRouter();
  const { data, error } = trpc.useQuery([
    "clients.login-client",
    {
      username: username,
      password: password,
    },
  ]);
  //   console.log(name, password, "name");
  if (error) {
    console.log(error.message);
  }

  router.push("/client");
  return <p>Redirecting</p>;
};

const ClientLogin = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [loginData, setLoginData] = useState({} as FormData);
  const [verificationDone, setVerificationDone] = useState(false);
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

  return (
    <div className="bg-black text-white w-full min-h-screen ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="text-black"
          {...register("username")}
          placeholder="Username"
        />
        <input
          className="text-black"
          {...register("password")}
          placeholder="Password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ClientLogin;