import { useRouter } from "next/router";
import React, { useState } from "react";
import { trpc } from "../../utils/trpc";
import { useForm } from "react-hook-form";
import { Input } from "../../components/login/Input";
import { Button } from "../../components/login/Button";

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
            placeholder="Enter your Registration Id"
            registerName={"registrationId"}
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

export default ArbitratorLogin;
