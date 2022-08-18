import { inferProcedureOutput } from "@trpc/server";
import React, { createContext, useContext } from "react";
import { AppRouter } from "../server/route/app.router";

type TQuery = keyof AppRouter["_def"]["queries"];

type InferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<
  AppRouter["_def"]["queries"][TRouteKey]
>;

const ClientContext =
  createContext<InferQueryOutput<"clients.detail">>(null);

function ClientContextProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: InferQueryOutput<"clients.detail"> | undefined;
}) {
  return (
    <ClientContext.Provider value={value}>
      {children}
    </ClientContext.Provider>
  );
}

const useClientContext = () => useContext(ClientContext);

export { useClientContext, ClientContextProvider };
