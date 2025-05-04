import { gql } from "@apollo/client";

export const FIND_MANY_SITE = gql`
  query FindManySite {
    findManySite {
      id
      domain
      name
      email
    }
  }
`;
