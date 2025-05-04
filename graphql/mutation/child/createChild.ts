import { gql } from "@apollo/client";

export const CREATE_CHILD = gql`
  mutation CreateChild($componentId: Int!) {
    createChild(componentId: $componentId)
  }
`;
