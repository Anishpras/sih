import { inferProcedureOutput } from "@trpc/server";
import React, { createContext, useContext } from "react";
import { AppRouter } from "../server/route/app.router";

type TQuery = keyof AppRouter["_def"]["queries"];

type InferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<
  AppRouter["_def"]["queries"][TRouteKey]
>;

const ArbitratorContext =
  createContext<InferQueryOutput<"arbitrators.detail">>(null);

function ArbitratorContextProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: InferQueryOutput<"arbitrators.detail"> | undefined;
}) {
  return (
    <ArbitratorContext.Provider value={value}>
      {children}
    </ArbitratorContext.Provider>
  );
}

const useArbitratorContext = () => useContext(ArbitratorContext);

export { useArbitratorContext, ArbitratorContextProvider };
