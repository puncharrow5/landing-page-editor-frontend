import { gql } from "@apollo/client";

export const UPDATE_MOBILE_FOOTER = gql`
  mutation UpdateMobileFooter(
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
    updateMobileFooter(
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
