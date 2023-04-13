import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode, useEffect } from "react";
import { Montserrat } from "next/font/google";
import theme from "@/components/themes";
import { QueryClient, QueryClientProvider } from "react-query";
import GoogleAnalyticsScripts from "@/components/GoogleAnalytics/GoogleAnalytics";
import { pageView } from "@/utils/googleAnalytics";
import SEOHeader from "@/components/SEO/DefaultSEO";
import { trpc } from "@/utils/trpc";

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const queryClient = new QueryClient();

const App = ({ Component, pageProps, router }: AppProps) => {
  useEffect(() => {
    const handleRouteChange = (url: URL) => pageView(url);
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  return (
    <StrictMode>
      <SEOHeader router={router} />
      <style jsx global>{`
        :root {
          --montserrat-font: ${montserrat.style.fontFamily};
        }
      `}</style>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
      <GoogleAnalyticsScripts />
    </StrictMode>
  );
};

export default trpc.withTRPC(App);
