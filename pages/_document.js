import { ColorModeScript } from "@chakra-ui/react";

import theme from "../theme";

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  // Inject the ChakraUI color script into the server-side rendered HTML.
  return (
    <Html lang="en">
      <Head />
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
