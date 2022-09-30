import "../styles/globals.css"
import type { AppType } from "next/app"
import { trpc } from "../utils/trpc"
import { MantineProvider } from '@mantine/core'

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'dark',
      }}
    >
      <Component {...pageProps} />
    </MantineProvider>)
}

export default trpc.withTRPC(MyApp)
