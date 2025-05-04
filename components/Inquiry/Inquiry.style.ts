import styled from "styled-components";
import {
  ContentStyleEntity,
  InquiryStyleEntity,
  TitleStyleEntity,
} from "@/graphql/generated/types";

export const Container = styled.div<{ $height?: string }>`
  display: flex;
  justify-content: center;
  width: 100%;
  height: ${({ $height }) => $height ?? "100%"};
  overflow: hidden;
`;

export const InquiryImage = styled.div`
  width: 50%;
  background-position: center;
  background-size: cover;
`;

export const InquiryBox = styled.div<{ $inquiryStyle?: InquiryStyleEntity }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  height: 100%;
  padding: ${({ $inquiryStyle }) => $inquiryStyle?.padding ?? ""};
  gap: ${({ $inquiryStyle }) => $inquiryStyle?.gap ?? "0px"};
  background-color: ${({ $inquiryStyle }) => $inquiryStyle?.backgroundColor ?? "#fff"};
`;

export const Title = styled.h1<{ $titleStyle?: TitleStyleEntity }>`
  font-weight: bold;
  margin: ${({ $titleStyle }) => $titleStyle?.margin ?? ""};
  color: ${({ $titleStyle }) => $titleStyle?.color ?? "#000"};
  font-size: ${({ $titleStyle }) => $titleStyle?.size ?? "10px"};
  line-height: ${({ $titleStyle }) => $titleStyle?.lineHeight ?? 1};
`;

export const Content = styled.div<{ $contentStyle?: ContentStyleEntity }>`
  margin: ${({ $contentStyle }) => $contentStyle?.margin ?? 0};
  color: ${({ $contentStyle }) => $contentStyle?.color ?? "#000"};
  font-size: ${({ $contentStyle }) => $contentStyle?.size ?? "10px"};
  line-height: ${({ $contentStyle }) => $contentStyle?.lineHeight ?? 1};
`;

export const Form = styled.div<{ $inquiryStyle?: InquiryStyleEntity }>`
  display: flex;
  flex-direction: column;
  font-size: ${({ $inquiryStyle }) => $inquiryStyle?.textSize ?? "10px"};
  color: ${({ $inquiryStyle }) => $inquiryStyle?.textColor ?? "#000"};
  gap: ${({ $inquiryStyle }) => $inquiryStyle?.gap ?? "0px"};
`;

export const Button = styled.div<{ $inquiryStyle?: InquiryStyleEntity }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: ${({ $inquiryStyle }) => $inquiryStyle?.buttonWidth ?? "100%"};
  height: ${({ $inquiryStyle }) => $inquiryStyle?.buttonHeight ?? "100%"};
  font-size: ${({ $inquiryStyle }) => $inquiryStyle?.textSize ?? "10px"};
  font-weight: bold;
  background-color: ${({ $inquiryStyle }) => $inquiryStyle?.buttonColor ?? "#fff"};
  border-radius: ${({ $inquiryStyle }) => $inquiryStyle?.buttonRadius ?? "#fff"};
`;
