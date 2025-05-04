import { gql } from "@apollo/client";

export const DELETE_CHILD = gql`
  mutation DeleteChild($id: Int!) {
    deleteChild(id: $id)
  }
`;
