import { gql } from "@apollo/client";

export const CREATE_COMPONENT = gql`
  mutation CreateComponent($siteId: Int!, $componentType: ComponentType!, $name: String!) {
    createComponent(siteId: $siteId, componentType: $componentType, name: $name)
  }
`;
