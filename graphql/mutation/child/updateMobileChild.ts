import { gql } from "@apollo/client";

export const UPDATE_MOBILE_CHILD = gql`
  mutation UpdateMobileChild(
    $id: Int!
    $title: String
    $content: String
    $mobileChildStyle: MobileChildStyleInput
    $file: Upload
  ) {
    updateMobileChild(
      id: $id
      title: $title
      content: $content
      mobileChildStyle: $mobileChildStyle
      file: $file
    )
  }
`;
