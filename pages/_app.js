import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";
import theme from "../theme";
import LogRocket from "logrocket";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    LogRocket.init("ptmrhf/bytecrowds");

    // Send the IP adress and current page to the analytics server.
    async function fetchAnalytics() {
      let page;
      let environment = process.env.NEXT_PUBLIC_ENVIRONMENT;
      if (environment === "development")
        // http://localhost:xxxx/abc => abc .
        page = document.URL.substring(22);
      else if (environment === "production")
        // https://www.bytecrowds.com/abc => abc .
        page = document.URL.substring(27);
      if (page === "") page = "index";
      await fetch(
        process.env.NEXT_PUBLIC_ANALYTICS_URL + "/analytics?page=" + page
      );
    }
    fetchAnalytics();
  }, []);

  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
