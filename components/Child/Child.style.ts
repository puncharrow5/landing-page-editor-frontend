import { ChildStyleEntity } from "@/graphql/generated/types";
import styled from "styled-components";

export const Container = styled.div<{ $childStyle?: ChildStyleEntity }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${({ $childStyle }) => ($childStyle?.width ? $childStyle?.width : "100px")};
  height: ${({ $childStyle }) => ($childStyle?.height ? $childStyle.height : "100px")};
  margin: ${({ $childStyle }) => $childStyle?.margin ?? "0"};
  padding: ${({ $childStyle }) => $childStyle?.padding ?? "0"};
  border: ${({ $childStyle }) => $childStyle?.border ?? "0"};
  border-radius: ${({ $childStyle }) => $childStyle?.borderRadius ?? "0"};
  background-size: cover;
  background-position: center;
`;

export const Title = styled.p<{ $childStyle?: ChildStyleEntity }>`
  font-size: ${({ $childStyle }) => $childStyle?.titleSize ?? "10px"};
  color: ${({ $childStyle }) => $childStyle?.titleColor ?? "#000"};
  line-height: ${({ $childStyle }) => $childStyle?.titleLineHeight ?? "1"};
  margin: ${({ $childStyle }) => $childStyle?.titleMargin ?? "0"};
`;

export const Content = styled.p<{ $childStyle?: ChildStyleEntity }>`
  font-size: ${({ $childStyle }) => $childStyle?.contentSize ?? "10px"};
  color: ${({ $childStyle }) => $childStyle?.contentColor ?? "#000"};
  line-height: ${({ $childStyle }) => $childStyle?.contentLineHeight ?? "1"};
  margin: ${({ $childStyle }) => $childStyle?.contentMargin ?? "0"};
`;
