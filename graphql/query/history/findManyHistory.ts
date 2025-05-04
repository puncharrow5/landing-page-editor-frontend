import { gql } from "@apollo/client";

export const FIND_MANY_HISTORY = gql`
  query FindManyHistory($skip: Int!, $take: Int!) {
    findManyHistory(skip: $skip, take: $take) {
      id
      description
      createdAt
      site {
        id
        name
        domain
      }
    }
  }
`;
