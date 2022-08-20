/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ButtonStyle } from "../components/login/Button";

export default function Home() {
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
      <div className="flex justify-center">
        <img
          alt="header-logo"
          src="/header-logo-title.svg"
          height="250"
          width="250"
          loading="lazy"
        />
      </div>
      <div className="relative -top-10 flex min-h-[40vh] w-full flex-col items-center justify-center ">
        <div className="grid gap-10 px-5 font-Montserrat font-semibold md:grid-cols-2 md:grid-rows-2 md:px-0">
          <Link href="/arbitrator/login">
            <button className={`${ButtonStyle} py-1 text-xl `} type="button">
              Arbitrator login
            </button>
          </Link>
          <Link href="/client/login">
            <button className={`${ButtonStyle} py-1 text-xl `} type="button">
              CLIENT login
            </button>
          </Link>
          <Link href="/arbitration-centre/login">
            <button className={`${ButtonStyle} py-1 text-xl `} type="button">
              Arbitrator - CENTRE login
            </button>
          </Link>
          <Link href="/admin/login">
            <button className={`${ButtonStyle} py-1 text-xl `} type="button">
              ADMIN login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
