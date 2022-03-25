import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { DarkMode, GlobalStyle } from '@chakra-ui/react'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  useEffect(async () => {
    let page = document.URL.substring(27);
    console.log(page);
    if (page === "")
      page = "index";
    await fetch(process.env.NEXT_PUBLIC_ANALYTICS_SERVER + "/analytics/" + page);

    alert("Bytecrowds is currently down due to hosting problems. We are sorry and we thank you for your patience!");
    location.href = "https://google.com";
  })
  
  return (
    <ChakraProvider>
      <DarkMode>
        <GlobalStyle />
        <Component {...pageProps} />
      </DarkMode>
    </ChakraProvider>
  );
}

export default MyApp
