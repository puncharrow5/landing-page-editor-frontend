import { gql } from "@apollo/client";

export const DELETE_MOBILE_CHILD = gql`
  mutation DeleteMobileChild($id: Int!) {
    deleteMobileChild(id: $id)
  }
`;
