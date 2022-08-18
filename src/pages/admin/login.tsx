import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components/login/Button";
import { Input } from "../../components/login/Input";

export default function AdminLogin() {
  const [loginData, setLoginData] = useState({});
  const { register, handleSubmit } = useForm();
  async function onSubmit(data: any) {
    setLoginData(data);
  }
  return (
    <div className="min-h-screen w-full bg-primary text-white ">
      <div className="p-4">
        <img
          src="minister-of-finance-logo.svg"
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
            src="header-logo.svg"
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
            placeholder="Enter your name"
            registerName={"name"}
          />
          <Input
            type="text"
            register={register}
            placeholder="Enter your password"
            registerName={"password"}
          />
          <Button type="submit">Login</Button>
        </form>
        {JSON.stringify(loginData)}
      </div>
    </div>
  );
}
