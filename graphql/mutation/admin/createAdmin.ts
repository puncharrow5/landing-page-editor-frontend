import { gql } from "@apollo/client";

export const CREATE_ADMIN = gql`
  mutation CreateAdmin(
    $email: String!
    $password: String!
    $confirmPassword: String!
    $name: String!
  ) {
    createAdmin(email: $email, password: $password, confirmPassword: $confirmPassword, name: $name)
  }
`;
