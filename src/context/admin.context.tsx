import { inferProcedureOutput } from "@trpc/server";
import React, { createContext, useContext } from "react";
import { AppRouter } from "../server/route/app.router";

type TQuery = keyof AppRouter["_def"]["queries"];

type InferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<
  AppRouter["_def"]["queries"][TRouteKey]
>;

const AdminContext =
  createContext<InferQueryOutput<"admin.detail">>(null);

function AdminContextProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: InferQueryOutput<"admin.detail"> | undefined;
}) {
  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

const useAdminContext = () => useContext(AdminContext);

export { useAdminContext, AdminContextProvider };
