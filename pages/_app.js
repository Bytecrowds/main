import "../styles/globals.css";

import { SessionProvider } from "next-auth/react";

import {
  ChakraProvider,
  useDisclosure,
  Modal,
  Text,
  ModalContent,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";

import theme from "../theme";

import { useEffect } from "react";

import LogRocket from "logrocket";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  // Controls the analytics info modal.
  const { isOpen, onOpen, onClose } = useDisclosure();

  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;

  useEffect(() => {
    if (environment === "production") LogRocket.init("ptmrhf/bytecrowds");

    // Analytics info.
    if (localStorage.getItem("modalShown") !== "true") onOpen();

    // Send the IP adress and current page to the analytics server.
    async function fetchAnalytics() {
      let page;
      if (environment === "development")
        // http://localhost:xxxx/abc => abc .
        page = document.URL.substring(22);
      else if (environment === "production")
        // https://www.bytecrowds.com/abc => abc .
        page = document.URL.substring(27);
      if (page === "") page = "index";
      await fetch(
        `${process.env.NEXT_PUBLIC_ANALYTICS_URL}/analytics?page=${page}`
      );
    }
    fetchAnalytics();

    // Triggered by "onOpen".
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Modal
          isOpen={isOpen}
          onClose={() => {
            localStorage.setItem("modalShown", "true");
            onClose();
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Please read!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                This website loggs essential analytics data such as IP addresses
                and pages data. The data is not selled or used for
                indentification. To request the deletion of your data mail me at
                tudor.zgimbau@gmail.com. This pop-up should appear only once per
                browser.
              </Text>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
