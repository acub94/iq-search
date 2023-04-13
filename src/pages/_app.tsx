import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";
import { Montserrat } from "next/font/google";
import theme from "@/components/themes";
import { QueryClient, QueryClientProvider } from "react-query";
import { trpc } from "@/utils/trpc";

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <StrictMode>
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
    </StrictMode>
  );
};

export default trpc.withTRPC(App);
