import { SessionProvider } from "next-auth/react"
import "./globals.css"
export default function App({
                              Component,
                              pageProps: { session, ...pageProps },
                            }: any) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
