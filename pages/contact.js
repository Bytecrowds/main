import Head from "next/head";

import { Text } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";

const Contact = () => {
  return (
    <>
      <Head>
        <title>Contact</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta name="author" content="Tudor Zgîmbău" />
        <meta name="application-name" content="Bytecrowds" />
      </Head>
      <Text
        marginTop={{
          sm: "260px",
          lg: "350px",
        }}
        fontSize="30px"
      >
        For any inquiry or feedback contact me at{" "}
        <Link
          isExternal
          href="mailto:tudor.zgimbau@gmail.com"
          background="brand"
        >
          {" "}
          tudor.zgimbau@gmail.com{" "}
        </Link>
        or message me on{" "}
        <Link
          isExternal
          href="https://www.linkedin.com/in/tudor-zg%C3%AEmb%C4%83u-a85274234/"
          background="brand"
        >
          Linkedin
        </Link>
      </Text>
    </>
  );
};

export default Contact;
