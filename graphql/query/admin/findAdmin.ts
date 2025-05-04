import { gql } from "@apollo/client";

export const FIND_ADMIN = gql`
  query FindAdmin {
    findAdmin {
      name
      email
      profileImage
      role {
        name
        description
      }
    }
  }
`;
