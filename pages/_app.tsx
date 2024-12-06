import type { AppProps } from 'next/app'
import { NhostProvider } from '@nhost/react'
import { ApolloProvider } from '@apollo/client'
import { nhost, apolloClient } from '../lib/nhost'
import { SceneProvider } from '../contexts/SceneContext'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NhostProvider nhost={nhost}>
      <ApolloProvider client={apolloClient}>
        <SceneProvider>
          <Component {...pageProps} />
        </SceneProvider>
      </ApolloProvider>
    </NhostProvider>
  )
}
