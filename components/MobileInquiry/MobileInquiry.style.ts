import styled from "styled-components";
import {
  ComponentMobileStyleEntity,
  ContentStyleEntity,
  MobileInquiryStyleEntity,
  TitleStyleEntity,
} from "@/graphql/generated/types";

export const Container = styled.div<{
  $componentMobileStyle?: ComponentMobileStyleEntity;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: ${({ $componentMobileStyle }) => $componentMobileStyle?.height ?? ""};
  padding: ${({ $componentMobileStyle }) => $componentMobileStyle?.padding ?? ""};
`;

export const Title = styled.h1<{ $titleStyle?: TitleStyleEntity }>`
  width: 100%;
  font-weight: bold;
  margin: ${({ $titleStyle }) => $titleStyle?.mobileMargin ?? ""};
  color: ${({ $titleStyle }) => $titleStyle?.color ?? "#000"};
  font-size: ${({ $titleStyle }) => $titleStyle?.mobileSize ?? "10px"};
  line-height: ${({ $titleStyle }) => $titleStyle?.mobileLineHeight ?? 1};
`;

export const Content = styled.div<{ $contentStyle?: ContentStyleEntity }>`
  width: 100%;
  margin: ${({ $contentStyle }) => $contentStyle?.mobileMargin ?? 0};
  color: ${({ $contentStyle }) => $contentStyle?.color ?? "#000"};
  font-size: ${({ $contentStyle }) => $contentStyle?.mobileSize ?? "10px"};
  line-height: ${({ $contentStyle }) => $contentStyle?.mobileLineHeight ?? 1};
`;

export const Form = styled.div<{ $textSize?: string; $gap?: string }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  font-size: ${({ $textSize }) => $textSize ?? "10px"};
  gap: ${({ $gap }) => $gap ?? ""};
`;

export const Box = styled.div<{
  $componentMobileStyle?: ComponentMobileStyleEntity;
  $mobileInquiryStyle?: MobileInquiryStyleEntity;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: ${({ $mobileInquiryStyle }) => $mobileInquiryStyle?.padding ?? ""};
  gap: ${({ $mobileInquiryStyle }) => $mobileInquiryStyle?.gap ?? ""};
  background-color: ${({ $mobileInquiryStyle }) => $mobileInquiryStyle?.backgroundColor ?? "#fff"};
`;

export const Button = styled.div<{ $mobileInquiryStyle?: MobileInquiryStyleEntity }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-top: 20px;
  width: ${({ $mobileInquiryStyle }) => $mobileInquiryStyle?.buttonWidth ?? "100%"};
  height: ${({ $mobileInquiryStyle }) => $mobileInquiryStyle?.buttonHeight ?? "100%"};
  font-size: ${({ $mobileInquiryStyle }) => $mobileInquiryStyle?.buttonTextSize ?? "10px"};
  color: ${({ $mobileInquiryStyle }) => $mobileInquiryStyle?.buttonTextColor ?? "#000"};
  font-weight: bold;
  background-color: ${({ $mobileInquiryStyle }) => $mobileInquiryStyle?.buttonColor ?? "#fff"};
  border-radius: ${({ $mobileInquiryStyle }) => $mobileInquiryStyle?.buttonRadius ?? "#fff"};
`;
