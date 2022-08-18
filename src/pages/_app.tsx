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
function MyApp({ Component, pageProps }: AppProps) {
  const {
    data: arbitratorData,
    error,
    isLoading: arbitratorIsLoading,
  } = trpc.useQuery(["arbitrators.detail"]);

  const {
    data: arbitrationCentreData,
    error: arbitrationCentreError,
    isLoading: arbitrationCentreIsLoading,
  } = trpc.useQuery(["arbitration-centres.detail"]);
  console.log(arbitrationCentreData, "arbitrationCentreData");
  if (arbitratorIsLoading || arbitrationCentreIsLoading) {
    return <>Loading...</>;
  }

  return (
    <ArbitratorCentreContextProvider value={arbitrationCentreData}>
      <ArbitratorContextProvider value={arbitratorData}>
        <main>
          <Component {...pageProps} />
        </main>
      </ArbitratorContextProvider>
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
