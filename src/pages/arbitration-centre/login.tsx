import { useRouter } from "next/router";
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { useArbitrationCentreContext } from "../../context/arbitrationCentre.context";
import { trpc } from "../../utils/trpc";

interface FormData {
  userName: string;
  password: string;
}

const LoginSubmit = ({
  name,
  password,
}: {
  name: string;
  password: string;
}) => {
  const router = useRouter();
  const { data, error } = trpc.useQuery([
    "arbitration-centres.login-arbitration-centre",
    {
      name: name,
      password: password,
    },
  ]);
  //   console.log(name, password, "name");
  if (error) {
    console.log(error.message);
  }

  console.log("Login Done");
  router.push("/arbitration-centre");
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
      <LoginSubmit name={loginData.userName} password={loginData.password} />
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
          {...register("userName")}
          placeholder="First name"
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
