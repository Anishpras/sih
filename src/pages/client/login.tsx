import { useRouter } from "next/router";
import React, { useState } from "react";
import { trpc } from "../../utils/trpc";
import { useForm } from "react-hook-form";
import { Input } from "../../components/login/Input";
import { Button } from "../../components/login/Button";

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
          <h1 className="font-bol text-xl">CLIENT LOGIN</h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="ite container mx-auto flex w-full flex-col content-center items-center justify-center justify-self-center object-center "
        >
          <Input
            type="text"
            register={register}
            placeholder="Enter your Username"
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
//   return (
//     <div className="bg-black text-white w-full min-h-screen ">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <input
//           className="text-black"
//           {...register("username")}
//           placeholder="Username"
//         />
//         <input
//           className="text-black"
//           {...register("password")}
//           placeholder="Password"
//         />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

export default ClientLogin;
