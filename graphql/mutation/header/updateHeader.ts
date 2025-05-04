import { gql } from "@apollo/client";

export const UPDATE_HEADER = gql`
  mutation UpdateHeader(
    $siteId: Int!
    $logo: String
    $logoSize: String
    $height: String
    $padding: String
    $gap: String
    $backgroundColor: String
    $textColor: String
    $textSize: String
  ) {
    updateHeader(
      siteId: $siteId
      logo: $logo
      logoSize: $logoSize
      height: $height
      padding: $padding
      gap: $gap
      backgroundColor: $backgroundColor
      textColor: $textColor
      textSize: $textSize
    )
  }
`;
