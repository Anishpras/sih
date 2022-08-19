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
      <div className="flex flex-col justify-center items-center sm:ml-2 lg:ml-0 sm:mb-10">
          <img
            alt="header-logo"
            src="/header-logo.svg"
            height="100"
            width="100"
            loading="lazy"
            className="mr-1"
          />
          <h3>Arbitration & Mediation Centre</h3>
        </div>
      <div className="flex min-h-[40vh] w-full flex-col items-center justify-center mt-10">
        <div className="grid gap-10 md:grid-cols-2 md:grid-rows-2">
          <Link href="/arbitrator/login">
            <button className={ButtonStyle} type="button">
              Arbitrator login
            </button>
          </Link>
          <Link href="/client/login">
            <button className={ButtonStyle} type="button">
              CLIENT login
            </button>
          </Link>
          <Link href="/arbitration-centre/login">
            <button className={ButtonStyle} type="button">
              Arbitrator - CENTRE login
            </button>
          </Link>
          <Link href="/admin/login">
            <button className={ButtonStyle} type="button">
              ADMIN login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}