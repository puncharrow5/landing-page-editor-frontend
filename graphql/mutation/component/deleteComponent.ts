import { gql } from "@apollo/client";

export const DELETE_COMPONENT = gql`
  mutation DeleteComponent($id: Int!) {
    deleteComponent(id: $id)
  }
`;
