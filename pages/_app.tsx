import "../styles/globals.css";
import "../styles/fonts.css";
import dynamic from "next/dynamic";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { AppProps } from "next/app";

const GlobalProvider = dynamic(
  () => {
    return import("../contexts/GlobalContext");
  },
  { ssr: false }
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </GlobalProvider>
  );
}

export default MyApp;
