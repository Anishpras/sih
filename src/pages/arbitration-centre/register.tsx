/* eslint-disable @next/next/no-img-element */
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { auth } from "../../../firebase";
import { ButtonStyle } from "../../components/login/Button";
import { CustomInputStyle } from "../../components/login/Input";
import {
  formContainer,
  loginScreenContainer,
  loginScreenFormContainer,
} from "../../styles/custonStyle";

import { trpc } from "../../utils/trpc";
const ArbitrationCentreRegister = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [arbitrationCentreId, setArbitrationCentreId] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const [otp, setOtp] = useState("");
  const [getOtpResult, setGetOtpResult] = useState("");
  const [flag, setFlag] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [otpError, setGetOtpError] = useState("");

  const { mutate, error } = trpc.useMutation(
    ["arbitration-centres.register-arbitration-centre"],
    {
      onError: (error: any) => {
        console.log(error);
      },
      onSuccess: () => {
        router.push("/arbitration-centre/login");
      },
    }
  );

  const setUpRecaptha = (number: number | string | any) => {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  };

  const getOtp = async (e: any) => {
    e.preventDefault();
    console.log(mobileNumber);
    setGetOtpError("");
    if (mobileNumber === "" || mobileNumber === undefined)
      return setGetOtpError("Please enter a valid phone number!");
    try {
      const response: number | string | any = await setUpRecaptha(
        "+91" + mobileNumber
      );
      setGetOtpResult(response);
      setFlag(true);
    } catch (err: number | string | any) {
      setGetOtpError(err.message);
      console.log(err);
    }
  };

  const verifyOtp = async (e: number | string | any) => {
    e.preventDefault();
    setGetOtpError("");
    if (otp === "" || otp === null) return;
    try {
      //@ts-ignore
      await getOtpResult.confirm(otp);

      handleSubmit(e);
      setOtpVerified(true);
      console.log(true);
    } catch (err: number | string | any) {
      setGetOtpError(err.message);
      console.log(err.message);
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (otpVerified) {
      mutate({
        name,
        description,
        password,
        arbitrationCentreId,
        mobileNumber,
      });
    }
  };
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
              xmlns="http://www.w3.org/2000/svg">
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
          <h1 className="font-Montserrat text-2xl font-bold uppercase ">
            Arbitration Centre
          </h1>
        </div>

        <form className={formContainer}>
          {error && <p>{error.message}</p>}
          <input
            type="text"
            value={name}
            placeholder={"Name"}
            className={CustomInputStyle}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            value={description}
            placeholder={"Description"}
            className={CustomInputStyle}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            value={arbitrationCentreId}
            placeholder={"Arbitration Centre Id"}
            className={CustomInputStyle}
            onChange={(e) => setArbitrationCentreId(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder={"Password"}
            className={CustomInputStyle}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            value={mobileNumber}
            placeholder={"Mobile Number"}
            className={CustomInputStyle}
            onChange={(e) => setMobileNumber(e.target.value)}
          />

          <div>
            <button
              className="focus:shadow-outline   my-3 flex w-full cursor-pointer justify-center   rounded-full bg-indigo-600 p-4  font-bold tracking-wide text-gray-100 shadow-lg transition duration-300 ease-in hover:bg-indigo-600 focus:outline-none"
              style={{ display: !flag ? "block" : "none" }}
              type="submit"
              //@ts-ignore
              onClick={(e) => getOtp(e)}>
              SEND OTP
            </button>
            <label style={{ display: flag ? "block" : "none" }}>
              <input
                type="number"
                value={otp}
                max="9999999999"
                onChange={(e) => setOtp(e.target.value)}
                placeholder="OTP"
              />
              <span>OTP</span>
            </label>
            <div
              style={{ display: !flag ? "block" : "none" }}
              id="recaptcha-container"></div>
            <button
              className=" focus:shadow-outline my-3 flex w-full cursor-pointer justify-center rounded-full border border-indigo-600 bg-transparent p-4 font-semibold  tracking-wide text-gray-100 shadow-lg transition duration-300 ease-in hover:bg-gray-900 focus:outline-none"
              style={{ display: flag ? "block" : "none" }}
              onClick={verifyOtp}>
              Verify OTP
            </button>
          </div>

          <button className={ButtonStyle} onClick={(e) => handleSubmit(e)}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default ArbitrationCentreRegister;
