import Head from "next/head";

import { Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import StyledText from "../components/styled/text";

// 3.75rem = 6xl default in Chakra UI.
const About = () => {
  return (
    <>
      <Head>
        <title>About</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta name="author" content="Tudor Zgîmbău" />
        <meta name="application-name" content="Bytecrowds" />
      </Head>
      <StyledText styling={{ marginTop: "30px", fontSize: "3.75rem" }}>
        What is Bytecrowds?
      </StyledText>
      <Text fontSize="30px">
        Bytecrowds is a free, open-source, real-time platform that allows you to
        share and enforce authorization for code snippets. Adopting the
        serverless architecture and its own, privacy-respecting analytics
        engine, it offers a reliable and secure way to quickly obtain sharable
        links of your code.
      </Text>
      <StyledText styling={{ marginTop: "120px", fontSize: "3.75rem" }}>
        Who&apos;s in charge of the project?
      </StyledText>
      <Text fontSize="30px">
        Currently the site is operated solely by me, Tudor Zgimbau. Find more in
        the{" "}
        <NextLink href="/contact" legacyBehavior passHref>
          <Link background="brand">contact</Link>
        </NextLink>{" "}
        section{" "}
      </Text>
      <StyledText styling={{ marginTop: "120px", fontSize: "3.75rem" }}>
        Is this a commercial project?
      </StyledText>
      <Text fontSize="30px">
        No, at least for now. This is a hobby project of mine that I will try to
        keep as updated as possible and maybe monetize through ads.
      </Text>
    </>
  );
};

export default About;
