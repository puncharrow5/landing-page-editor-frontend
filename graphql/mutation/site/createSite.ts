import { gql } from "@apollo/client";

export const CREATE_SITE = gql`
  mutation CreateSite($domain: String!, $name: String!, $email: String!) {
    createSite(domain: $domain, name: $name, email: $email)
  }
`;
