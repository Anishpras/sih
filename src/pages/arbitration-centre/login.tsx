import { useRouter } from "next/router";
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { useArbitrationCentreContext } from "../../context/arbitrationCentre.context";
import { trpc } from "../../utils/trpc";

interface FormData {
  arbitrationCentreId: string;
  password: string;
}

const LoginSubmit = ({
  arbitrationCentreId,
  password,
}: {
  arbitrationCentreId: string;
  password: string;
}) => {
  const { data, error, isLoading } = trpc.useQuery([
    "arbitration-centres.login-arbitration-centre",
    {
      arbitrationCentreId: arbitrationCentreId,
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

const Login = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [loginData, setLoginData] = useState({} as FormData);
  const [verificationDone, setVerificationDone] = useState(false);
  const router = useRouter();
  const arbitrationCentreData = useArbitrationCentreContext();

  async function onSubmit(data: FormData) {
    setLoginData(data);
    setVerificationDone(true);
  }
  if (verificationDone) {
    return (
      <LoginSubmit
        arbitrationCentreId={loginData.arbitrationCentreId}
        password={loginData.password}
      />
    );
  }
  if (arbitrationCentreData) {
    router.push("/arbitration-centre");
  }
  return (
    <div className="bg-black text-white w-full min-h-screen ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="text-black"
          {...register("arbitrationCentreId")}
          placeholder="arbitrationCentreId"
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

export default Login;
