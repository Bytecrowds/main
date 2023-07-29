import Head from "next/head";
import NextLink from "next/link";

import { useState, useEffect } from "react";
import { Flex, Link, Spacer, Button, Text, Box } from "@chakra-ui/react";

import StyledText from "../components/styled/text";

import Image from "next/image";
import logo from "../public/logo.png";

const Home = () => {
  const [randomLink, setRandomLink] = useState("/snippetzone");

  useEffect(() => {
    setRandomLink(
      `/${Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substring(0, 7)}`
    );
  }, []);

  return (
    <>
      <Head>
        <title>
          Bytecrowds - a free, easy-to-use serverless code-sharing platform
        </title>

        <meta
          name="description"
          content="Bytecrowds is a free code-sharing platform with minimalist design and its own analytics engine.
          Quick sharing, reliable infrastructure and built-in authorization!"
        />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Tudor Zgîmbău" />
        <meta name="application-name" content="Bytecrowds" />
        <meta
          name="keywords"
          content="code-sharing, serverless, minimalist, authorization, sharing"
        />
      </Head>
      <Flex>
        <Button>
          <Text fontSize="20px">
            <Link as={NextLink} href="/about" background="brand">
              about us
            </Link>
          </Text>
        </Button>
        <Spacer />
        <Button>
          <Text fontSize="20px">
            <Link as={NextLink} href="/contact" background="brand">
              contact
            </Link>
          </Text>
        </Button>
      </Flex>
      <Flex
        flexDirection="column"
        marginTop={{
          "2xl": "130px",
          xl: "70px",
          lg: "70px",
          md: "70px",
          base: "10px",
        }}
        marginLeft={{
          "2xl": "200px",
          lg: "120px",
          md: "80px",
          base: "5px",
        }}
      >
        <div>
          <Flex
            alignItems="center"
            flexDirection={{
              base: "column",
              xl: "row",
              lg: "row",
              md: "row",
            }}
          >
            <Text fontSize="65px" fontWeight="600">
              Welcome to
            </Text>
            <Text
              marginLeft={{
                xl: "14px",
                lg: "14px",
                md: "14px",
              }}
              fontSize="65px"
              fontWeight="600"
              background="brand"
              backgroundClip="text"
              fill="transparent"
            >
              Bytecrowds
            </Text>
            <Image
              style={{ marginLeft: "50px" }}
              src={logo}
              alt="logo"
              width="115"
            />
          </Flex>
          <Text marginTop="20px" fontWeight="600" fontSize="35px">
            &quot;an easy & quick way to share code with friends and teams,
            currently in beta&quot;
          </Text>
          <Button
            // Use this instead of link to prevent caching
            onClick={() => {
              location.href = randomLink;
            }}
            marginTop="75px"
            width={{
              xl: "450px",
              lg: "450px",
              md: "450px",
            }}
            height="90px"
            fontSize="30px"
            fontWeight="600"
          >
            <StyledText>new bytecrowd</StyledText>
          </Button>
        </div>
        <Box
          marginTop={{
            xl: "180px",
            lg: "180px",
            md: "180px",
            base: "50px",
          }}
        >
          {[
            {
              title: "developed in",
              author: "Tudor Zgîmbău",
              link: "https://www.linkedin.com/in/tudor-zgîmbău-a85274234",
            },
            {
              title: "logo",
              author: "Luca Sainenco",
              link: "https://github.com/LucaSain",
            },
          ].map((credit) => {
            return (
              <Flex
                flexDirection="row"
                width="400px"
                justifyItems="center"
                key={credit.author}
              >
                <Text fontSize="16px">{credit.title}</Text>
                {credit.title.includes("developed") && (
                  <svg
                    style={{ marginLeft: "10px", marginRight: "5px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 3 2"
                  >
                    <path fill="#002B7F" d="M0 0h3v2H0z" />
                    <path fill="#FCD116" d="M1 0h2v2H1z" />
                    <path fill="#CE1126" d="M2 0h1v2H2z" />
                  </svg>
                )}
                <Text fontSize="16px" marginLeft="5px">
                  by{" "}
                  <Link href={credit.link} background="brand" isExternal>
                    {credit.author}
                  </Link>
                </Text>
              </Flex>
            );
          })}
          <Flex flexDirection="row" width="400px" justifyItems="center">
            <Text fontSize="16px">
              Check the source code on{" "}
              <Link
                href="https://github.com/Bytecrowds/bytecrowds"
                background="brand"
                isExternal
              >
                GitHub
              </Link>
            </Text>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default Home;
