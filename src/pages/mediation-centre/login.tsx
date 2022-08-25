/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { Loader } from "../../components/loader/Loader";
import { Button } from "../../components/login/Button";
import { Input } from "../../components/login/Input";
import { useMediationCentreContext } from "../../context/mediationCentre.context";
import {
  formContainer,
  loginScreenContainer,
  loginScreenFormContainer,
} from "../../styles/custonStyle";
import { trpc } from "../../utils/trpc";

interface FormData {
  mediationCentreId: string;
  password: string;
}

const LoginSubmit = ({
  mediationCentreId,
  password,
}: {
  mediationCentreId: string;
  password: string;
}) => {
  const { data, error, isLoading } = trpc.useQuery([
    "mediation-centres.login-mediation-centre",
    {
      mediationCentreId: mediationCentreId,
      password: password,
    },
  ]);
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
};

const Login = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [loginData, setLoginData] = useState({} as FormData);
  const [verificationDone, setVerificationDone] = useState(false);

  const mediationCentreData = useMediationCentreContext();

  async function onSubmit(data: FormData) {
    setLoginData(data);
    setVerificationDone(true);
  }
  if (verificationDone) {
    return (
      <LoginSubmit
        mediationCentreId={loginData.mediationCentreId}
        password={loginData.password}
      />
    );
  }
  if (mediationCentreData) {
    window.location.href = "/mediation-centre";
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
          <h1 className="text-2xl font-bold uppercase">
            Mediation Centre LOGIN
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={formContainer}>
          <Input
            type="text"
            register={register}
            placeholder="Enter your Mediation Centre Id"
            registerName={"mediationCentreId"}
          />
          <Input
            type="password"
            register={register}
            placeholder="Enter your password"
            registerName={"password"}
          />
          <Button type="submit">Login</Button>
          <Link href="/mediation-centre/register">
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
//   return (
//     <div className="bg-black text-white w-full min-h-screen ">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <input
//           className="text-black"
//           {...register("mediationCentreId")}
//           placeholder="arbitrationCentreId"
//         />
//         <input
//           className="text-black"
//           {...register("password")}
//           placeholder="Last name"
//         />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

export default Login;
