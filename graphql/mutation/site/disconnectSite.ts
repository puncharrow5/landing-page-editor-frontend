import { gql } from "@apollo/client";

export const DISCONNECT_SITE = gql`
  mutation DisconnectSite($id: Int!) {
    disconnectSite(id: $id)
  }
`;
