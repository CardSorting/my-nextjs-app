import { NhostClient } from '@nhost/nhost-js'
import { NhostProvider } from '@nhost/react'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

// Replace these with your actual Nhost project details
const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || '',
  region: process.env.NEXT_PUBLIC_NHOST_REGION || ''
})

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_NHOST_GRAPHQL_URL,
  headers: {
    'x-hasura-admin-secret': process.env.NHOST_ADMIN_SECRET || ''
  }
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

export { nhost, NhostProvider, apolloClient }
