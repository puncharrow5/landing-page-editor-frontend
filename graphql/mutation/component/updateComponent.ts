import { gql } from "@apollo/client";

export const UPDATE_COMPONENT = gql`
  mutation UpdateComponent(
    $id: Int!
    $name: String!
    $title: String
    $mobileTitle: String
    $content: String
    $mobileContent: String
    $componentStyle: ComponentStyleInput
    $componentMobileStyle: ComponentMobileStyleInput
    $titleStyle: TitleStyleInput
    $contentStyle: ContentStyleInput
    $inquiryStyle: InquiryStyleInput
    $mobileInquiryStyle: MobileInquiryStyleInput
  ) {
    updateComponent(
      id: $id
      name: $name
      title: $title
      mobileTitle: $mobileTitle
      content: $content
      mobileContent: $mobileContent
      componentStyle: $componentStyle
      componentMobileStyle: $componentMobileStyle
      titleStyle: $titleStyle
      contentStyle: $contentStyle
      inquiryStyle: $inquiryStyle
      mobileInquiryStyle: $mobileInquiryStyle
    )
  }
`;
