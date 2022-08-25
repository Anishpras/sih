import { inferProcedureOutput } from "@trpc/server";
import React, { createContext, useContext } from "react";
import { AppRouter } from "../server/route/app.router";

type TQuery = keyof AppRouter["_def"]["queries"];

type InferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<
  AppRouter["_def"]["queries"][TRouteKey]
>;

const MediationPartyContext =
  createContext<InferQueryOutput<"mediation-party.detail">>(null);

function MediationPartyContextProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: InferQueryOutput<"mediation-party.detail"> | undefined;
}) {
  return (
    <MediationPartyContext.Provider value={value}>
      {children}
    </MediationPartyContext.Provider>
  );
}

const useMediationPartyContext = () => useContext(MediationPartyContext);

export { useMediationPartyContext, MediationPartyContextProvider };
