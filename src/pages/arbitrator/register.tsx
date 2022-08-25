/* eslint-disable @next/next/no-img-element */
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { auth } from "../../../firebase";
import { ButtonStyle } from "../../components/login/Button";
import { CustomInputStyle } from "../../components/login/Input";
import {
  formContainer,
  loginFormHeader,
  loginScreenContainer,
  loginScreenFormContainer,
} from "../../styles/custonStyle";

import { trpc } from "../../utils/trpc";
const ArbitratorRegister = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [registrationId, setRegistrationId] = useState("");
  const [adminId, setAdminId] = useState("");

  const [mobileNumber, setMobileNumber] = useState("");

  const [otp, setOtp] = useState("");
  const [getOtpResult, setGetOtpResult] = useState("");
  const [flag, setFlag] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [otpError, setGetOtpError] = useState("");

  const { mutate, error } = trpc.useMutation(
    ["arbitrators.register-arbitrator"],
    {
      onError: (error: any) => {
        console.log(error);
      },
      onSuccess: () => {
        router.push("/arbitrator/login");
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
        registrationId,
        adminId,
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
          <h1 className="font-Montserrat text-2xl font-bold ">
            ARBITRATOR REGISTRATION
          </h1>
        </div>
        <form className={formContainer}>
          {error && <p>{error.message}</p>}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={"NAME"}
            className={CustomInputStyle}
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={"DESCRIPTION"}
            className={CustomInputStyle}
          />
          <input
            type="text"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            placeholder={"Admin Id"}
            className={CustomInputStyle}
          />
          <input
            type="text"
            value={registrationId}
            onChange={(e) => setRegistrationId(e.target.value)}
            placeholder={"Registration Id"}
            className={CustomInputStyle}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={"PASSWORD"}
            className={CustomInputStyle}
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
              className=" focus:shadow-outline my-3 flex w-full cursor-pointer justify-center rounded-full border   bg-transparent bg-gray-900 p-4  font-semibold tracking-wide text-gray-100 shadow-lg transition duration-300 ease-in focus:outline-none"
              style={{ display: !flag ? "block" : "none" }}
              type="submit"
              //@ts-ignore
              onClick={(e) => getOtp(e)}
            >
              SEND OTP
            </button>
            <label style={{ display: flag ? "block" : "none" }}>
              <input
                type="number"
                value={otp}
                max="9999999999"
                className={CustomInputStyle}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="OTP"
              />
              <span>OTP</span>
            </label>
            <div
              style={{ display: !flag ? "block" : "none" }}
              id="recaptcha-container"
            ></div>
            {otpVerified ? (
              <button
                className=" focus:shadow-outline  my-3 flex w-full cursor-pointer justify-center rounded-full border bg-transparent   bg-gray-900 p-4 font-semibold  tracking-wide text-gray-100 shadow-lg transition duration-300 ease-in focus:outline-none disabled:cursor-none disabled:bg-slate-600"
                style={{ display: flag ? "block" : "none" }}
              >
                Verified OTP
              </button>
            ) : (
              <button
                type="button"
                className=" focus:shadow-outline my-3 flex w-full cursor-pointer justify-center rounded-full border   bg-transparent bg-gray-900 p-4  font-semibold tracking-wide text-gray-100 shadow-lg transition duration-300 ease-in focus:outline-none"
                style={{ display: flag ? "block" : "none" }}
                onClick={verifyOtp}
              >
                Verify OTP
              </button>
            )}
          </div>
          <button className={ButtonStyle} onClick={(e) => handleSubmit(e)}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default ArbitratorRegister;
