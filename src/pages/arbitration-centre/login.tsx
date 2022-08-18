import { useRouter } from "next/router";
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { Button } from "../../components/login/Button";
import { Input } from "../../components/login/Input";
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
        <div>
          <img
            alt="header-logo"
            src="/header-logo.svg"
            height="200"
            width="300"
            loading="lazy"
          />
        </div>
        <div>
          <h1 className="font-bol text-xl">ARBITRATOR LOGIN</h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="ite container mx-auto flex w-full flex-col content-center items-center justify-center justify-self-center object-center "
        >
          <Input
            type="text"
            register={register}
            placeholder="Enter your Arbitration Centre Id"
            registerName={"arbitrationCentreId"}
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
//   return (
//     <div className="bg-black text-white w-full min-h-screen ">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <input
//           className="text-black"
//           {...register("arbitrationCentreId")}
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
