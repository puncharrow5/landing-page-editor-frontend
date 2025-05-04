import { gql } from "@apollo/client";

export const SEND_VERIFY_CODE = gql`
  mutation SendVerifyCode($email: String!) {
    sendVerifyCode(email: $email)
  }
`;
