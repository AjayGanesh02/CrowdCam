import { SessionProvider } from "next-auth/react"
import { ProfileImageProvider } from "@/contexts/ProfileContext"
import "./globals.css"
export default function App({
                              Component,
                              pageProps: { session, ...pageProps },
                            }: any) {
  return (
    <SessionProvider session={session}>
      <ProfileImageProvider>
        <Component {...pageProps} />
      </ProfileImageProvider>
    </SessionProvider>
  )
}
