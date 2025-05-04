import { gql } from "@apollo/client";

export const CONNECT_SITE = gql`
  mutation ConnectSite($domain: String!) {
    connectSite(domain: $domain)
  }
`;
