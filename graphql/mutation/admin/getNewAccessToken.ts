import { gql } from "@apollo/client";

export const GET_NEW_ACCESS_TOKEN = gql`
  mutation GetNewAccessToken {
    getNewAccessToken
  }
`;
