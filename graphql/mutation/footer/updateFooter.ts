import { gql } from "@apollo/client";

export const UPDATE_FOOTER = gql`
  mutation UpdateFooter(
    $siteId: Int!
    $footerType: Int!
    $logo: String
    $logoSize: String
    $contentTop: String
    $helpCenter: String
    $terms: String
    $contentBottom: String
    $backgroundColor: String
    $paddingTop: String
    $paddingBottom: String
    $textSize: String
    $textColor: String
    $lineHeight: Float
  ) {
    updateFooter(
      siteId: $siteId
      footerType: $footerType
      logo: $logo
      logoSize: $logoSize
      contentTop: $contentTop
      helpCenter: $helpCenter
      terms: $terms
      contentBottom: $contentBottom
      backgroundColor: $backgroundColor
      paddingTop: $paddingTop
      paddingBottom: $paddingBottom
      textSize: $textSize
      textColor: $textColor
      lineHeight: $lineHeight
    )
  }
`;
