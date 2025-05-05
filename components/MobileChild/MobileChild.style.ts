import { MobileChildStyleEntity } from "@/graphql/generated/types";
import styled from "styled-components";

export const Container = styled.div<{ $mobileChildStyle?: MobileChildStyleEntity }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${({ $mobileChildStyle }) => $mobileChildStyle?.width || "100px"};
  height: ${({ $mobileChildStyle }) => $mobileChildStyle?.height || "100px"};
  margin: ${({ $mobileChildStyle }) => $mobileChildStyle?.margin ?? "0"};
  padding: ${({ $mobileChildStyle }) => $mobileChildStyle?.padding ?? "0"};
  border: ${({ $mobileChildStyle }) => $mobileChildStyle?.border ?? "0"};
  border-radius: ${({ $mobileChildStyle }) => $mobileChildStyle?.borderRadius ?? "0"};
  background-size: cover;
  background-position: center;
`;

export const Title = styled.p<{ $mobileChildStyle?: MobileChildStyleEntity }>`
  font-size: ${({ $mobileChildStyle }) => $mobileChildStyle?.titleSize || 10}px;
  color: ${({ $mobileChildStyle }) => $mobileChildStyle?.titleColor || "#000"};
  line-height: ${({ $mobileChildStyle }) => $mobileChildStyle?.titleLineHeight || "1"};
  margin: ${({ $mobileChildStyle }) => $mobileChildStyle?.titleMargin || "0"};
`;

export const Content = styled.p<{ $mobileChildStyle?: MobileChildStyleEntity }>`
  font-size: ${({ $mobileChildStyle }) => $mobileChildStyle?.contentSize || 10}px;
  color: ${({ $mobileChildStyle }) => $mobileChildStyle?.contentColor || "#000"};
  line-height: ${({ $mobileChildStyle }) => $mobileChildStyle?.contentLineHeight || "1"};
  margin: ${({ $mobileChildStyle }) => $mobileChildStyle?.contentMargin || "0"};
`;
