import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { DarkMode, GlobalStyle } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <DarkMode>
        <GlobalStyle />
        <Component {...pageProps} />
      </DarkMode>
    </ChakraProvider>
  )
}

export default MyApp
