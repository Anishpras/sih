import { inferProcedureOutput } from "@trpc/server";
import React, { createContext, useContext } from "react";
import { AppRouter } from "../server/route/app.router";

type TQuery = keyof AppRouter["_def"]["queries"];

type InferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<
  AppRouter["_def"]["queries"][TRouteKey]
>;

const ArbitratorCentreContext =
  createContext<InferQueryOutput<"arbitration-centres.detail">>(null);

function ArbitratorCentreContextProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: InferQueryOutput<"arbitration-centres.detail"> | undefined;
}) {
  return (
    <ArbitratorCentreContext.Provider value={value}>
      {children}
    </ArbitratorCentreContext.Provider>
  );
}

const useArbitrationCentreContext = () => useContext(ArbitratorCentreContext);

export { useArbitrationCentreContext, ArbitratorCentreContextProvider };
