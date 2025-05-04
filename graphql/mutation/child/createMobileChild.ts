import { gql } from "@apollo/client";

export const CREATE_MOBILE_CHILD = gql`
  mutation CreateMobileChild($componentId: Int!) {
    createMobileChild(componentId: $componentId)
  }
`;
