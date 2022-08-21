/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ButtonStyle } from "../components/login/Button";
import { loginScreenContainer } from "../styles/custonStyle";

export default function Home() {
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
        <div className="relative p-4 ">
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
              height="250"
              width="250"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <div className=" relative  flex w-full flex-col items-center justify-center  px-5 ">
        <div className="grid w-full  items-center justify-center gap-10 font-Montserrat font-semibold md:grid-cols-2 md:grid-rows-2 md:px-0">
          <Link href="/arbitrator/login">
            <button className={`${ButtonStyle} text-xl `} type="button">
              Arbitrator login
            </button>
          </Link>
          <Link href="/client/login">
            <button className={`${ButtonStyle} text-xl `} type="button">
              CLIENT login
            </button>
          </Link>
          <Link href="/arbitration-centre/login">
            <button className={`${ButtonStyle} px-8  text-xl `} type="button">
              Arbitrator - CENTRE login
            </button>
          </Link>
          <Link href="/admin/login">
            <button className={`${ButtonStyle} text-xl `} type="button">
              ADMIN login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
