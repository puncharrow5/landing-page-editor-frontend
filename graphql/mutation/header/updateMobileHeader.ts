import { gql } from "@apollo/client";

export const UPDATE_MOBILE_HEADER = gql`
  mutation UpdateMobileHeader(
    $siteId: Int!
    $logo: String
    $logoSize: String
    $button: String
    $buttonSize: String
    $height: String
    $padding: String
    $menuPadding: String
    $backgroundColor: String
    $menuBackgroundColor: String
    $textSize: String
    $textColor: String
  ) {
    updateMobileHeader(
      siteId: $siteId
      logo: $logo
      logoSize: $logoSize
      button: $button
      buttonSize: $buttonSize
      height: $height
      padding: $padding
      menuPadding: $menuPadding
      backgroundColor: $backgroundColor
      menuBackgroundColor: $menuBackgroundColor
      textSize: $textSize
      textColor: $textColor
    )
  }
`;
