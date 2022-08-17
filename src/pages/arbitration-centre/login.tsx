import { useRouter } from "next/router";
import React, { useState } from "react";
import { trpc } from "../../utils/trpc";
import { useForm } from "react-hook-form";

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

  router.push("/arbitration-centre/land");
  //   window.location.href = "/arbitration-centre/land";
//   console.log("Login Done");
  return <p>Redirecting</p>;
};

const Login = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [loginData, setLoginData] = useState({} as FormData);
  const [verificationDone, setVerificationDone] = useState(false);
  async function onSubmit(data: FormData) {
    setLoginData(data);
    setVerificationDone(true);
  }
  if (verificationDone) {
    return (
      <LoginSubmit name={loginData.userName} password={loginData.password} />
    );
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
