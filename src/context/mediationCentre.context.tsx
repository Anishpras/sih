import { inferProcedureOutput } from "@trpc/server";
import React, { createContext, useContext } from "react";
import { AppRouter } from "../server/route/app.router";

type TQuery = keyof AppRouter["_def"]["queries"];

type InferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<
  AppRouter["_def"]["queries"][TRouteKey]
>;

const MediationCentreContext =
  createContext<InferQueryOutput<"mediation-centres.detail">>(null);

function MediationCentreContextProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: InferQueryOutput<"mediation-centres.detail"> | undefined;
}) {
  return (
    <MediationCentreContext.Provider value={value}>
      {children}
    </MediationCentreContext.Provider>
  );
}

const useMediationCentreContext = () => useContext(MediationCentreContext);

export { useMediationCentreContext, MediationCentreContextProvider };
