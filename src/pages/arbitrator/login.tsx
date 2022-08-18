import { useRouter } from "next/router";
import React, { useState } from "react";
import { trpc } from "../../utils/trpc";
import { useForm } from "react-hook-form";

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
  const { data, error } = trpc.useQuery([
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

  router.push("/arbitrator");
  return <p>Redirecting</p>;
};

const ArbitratorLogin = () => {
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
        registrationId={loginData.registrationId}
        password={loginData.password}
      />
    );
  }

  return (
    <div className="bg-black text-white w-full min-h-screen ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="text-black"
          {...register("registrationId")}
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

export default ArbitratorLogin;
