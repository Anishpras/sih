import { inferProcedureOutput } from "@trpc/server";
import React, { createContext, useContext } from "react";
import { AppRouter } from "../server/route/app.router";

type TQuery = keyof AppRouter["_def"]["queries"];

type InferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<
  AppRouter["_def"]["queries"][TRouteKey]
>;

const MediationAdminContext =
  createContext<InferQueryOutput<"mediation-admin.detail">>(null);

function MediationAdminContextProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: InferQueryOutput<"mediation-admin.detail"> | undefined;
}) {
  return (
    <MediationAdminContext.Provider value={value}>
      {children}
    </MediationAdminContext.Provider>
  );
}

const useMediationAdminContext = () => useContext(MediationAdminContext);

export { useMediationAdminContext, MediationAdminContextProvider };
