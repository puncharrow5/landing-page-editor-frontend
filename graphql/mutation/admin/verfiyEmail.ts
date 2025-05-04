import { gql } from "@apollo/client";

export const VERIFY_EMAIL = gql`
  mutation VerifyEmail($email: String!, $verifyCode: String!) {
    verifyEmail(email: $email, verifyCode: $verifyCode)
  }
`;
