import styled from "styled-components";
import { ContentStyleEntity, TitleStyleEntity } from "@/graphql/generated/types";

export const Container = styled.div<{ $height?: string; $padding?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: ${({ $height }) => $height ?? "754px"};
  padding: ${({ $padding }) => $padding ?? "0"};
  background-size: cover;
  background-position: center;
`;

export const Title = styled.h1<{ $titleStyle?: TitleStyleEntity }>`
  font-weight: bold;
  margin: ${({ $titleStyle }) => $titleStyle?.mobileMargin ?? 0};
  color: ${({ $titleStyle }) => $titleStyle?.color ?? "#000"};
  font-size: ${({ $titleStyle }) => $titleStyle?.mobileSize ?? "10px"};
  line-height: ${({ $titleStyle }) => $titleStyle?.mobileLineHeight ?? 1};
`;

export const Content = styled.div<{ $contentStyle?: ContentStyleEntity }>`
  margin: ${({ $contentStyle }) => $contentStyle?.mobileMargin ?? 0};
  color: ${({ $contentStyle }) => $contentStyle?.color ?? "#000"};
  font-size: ${({ $contentStyle }) => $contentStyle?.mobileSize ?? "10px"};
  line-height: ${({ $contentStyle }) => $contentStyle?.mobileLineHeight ?? 1};
`;

export const ChildrenBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
