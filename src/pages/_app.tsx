import "../styles/globals.css";
import type { AppProps } from "next/app";
import { withTRPC } from "@trpc/next";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import superjson from "superjson";
import { AppRouter } from "../server/route/app.router";
import { url } from "../utils/constants";
import { trpc } from "../utils/trpc";
import { ArbitratorContextProvider } from "../context/arbitrator.context";
import { ArbitratorCentreContextProvider } from "../context/arbitrationCentre.context";
import { AdminContextProvider } from "../context/admin.context";
import { ClientContextProvider } from "../context/client.context";
import { Loader } from "../components/loader/Loader";
import { MantineProvider } from "@mantine/core";
import { MediationCentreContextProvider } from "../context/mediationCentre.context";
import { MediationAdminContextProvider } from "../context/mediationAdmin.context";
import { MediatorContextProvider } from "../context/mediator.context";
import { MediationPartyContextProvider } from "../context/mediationParty.context";

function MyApp({ Component, pageProps }: AppProps) {
  const {
    data: arbitratorData,
    error,
    isLoading: arbitratorIsLoading,
  } = trpc.useQuery(["arbitrators.detail"]);

  const {
    data: mediatorData,
    error: mediatorError,
    isLoading: mediatorIsLoading,
  } = trpc.useQuery(["mediators.detail"]);
  const {
    data: arbitrationCentreData,
    error: arbitrationCentreError,
    isLoading: arbitrationCentreIsLoading,
  } = trpc.useQuery(["arbitration-centres.detail"]);
  const {
    data: mediationCentreData,
    error: mediationCentreError,
    isLoading: mediationCentreIsLoading,
  } = trpc.useQuery(["mediation-centres.detail"]);
  const {
    data: adminData,
    error: adminError,
    isLoading: adminIsLoading,
  } = trpc.useQuery(["admin.detail"]);
  const {
    data: mediationAdminData,
    error: mediationAdminError,
    isLoading: mediationAdminIsLoading,
  } = trpc.useQuery(["mediation-admin.detail"]);
  const {
    data: clientData,
    error: clientError,
    isLoading: clientIsLoading,
  } = trpc.useQuery(["clients.detail"]);
  const {
    data: mediationPartyData,
    error: mediationPartyError,
    isLoading: mediationPartyIsLoading,
  } = trpc.useQuery(["mediation-party.detail"]);

  if (
    arbitratorIsLoading ||
    arbitrationCentreIsLoading ||
    adminIsLoading ||
    mediatorIsLoading ||
    mediationCentreIsLoading ||
    mediationAdminIsLoading
  ) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <ArbitratorCentreContextProvider value={arbitrationCentreData}>
      <MediationCentreContextProvider value={mediationCentreData}>
        <AdminContextProvider value={adminData}>
          <MediationAdminContextProvider value={mediationAdminData}>
            <ArbitratorContextProvider value={arbitratorData}>
              <MediatorContextProvider value={mediatorData}>
                <ClientContextProvider value={clientData}>
                  <MediationPartyContextProvider value={mediationPartyData}>
                    <MantineProvider withGlobalStyles withNormalizeCSS>
                      <Component {...pageProps} />
                    </MantineProvider>
                  </MediationPartyContextProvider>
                </ClientContextProvider>
              </MediatorContextProvider>
            </ArbitratorContextProvider>
          </MediationAdminContextProvider>
        </AdminContextProvider>
      </MediationCentreContextProvider>
    </ArbitratorCentreContextProvider>
  );
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const links = [
      loggerLink(),
      httpBatchLink({
        maxBatchSize: 10,
        url,
      }),
    ];

    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 60,
          },
        },
      },
      headers() {
        if (ctx?.req) {
          return {
            ...ctx.req.headers,
            "x-ssr": "1",
          };
        }
        return {};
      },
      links,
      transformer: superjson,
    };
  },
  ssr: false,
})(MyApp);
