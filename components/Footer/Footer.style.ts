import { FooterEntity } from "@/graphql/generated/types";
import styled from "styled-components";

export const Container = styled.div<{
  $footer: FooterEntity | null;
}>`
  display: flex;
  flex-direction: column;
  background-color: ${({ $footer }) => $footer?.backgroundColor ?? "#FFF"};
  font-size: ${({ $footer }) => $footer?.textSize ?? "10px"};
  color: ${({ $footer }) => $footer?.textColor ?? "#000"};
`;

export const Top = styled.div<{ $paddingTop?: string | null }>`
  display: flex;
  flex-direction: row;
  padding: ${({ $paddingTop }) => $paddingTop ?? ""};
  border-bottom: 1px solid #e7e7ec;
`;

export const Grid = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: auto auto;
  gap: 10px 100px;
`;

export const Bottom = styled.div<{ $paddingBottom?: string | null }>`
  display: flex;
  flex-direction: row;
  padding: ${({ $paddingBottom }) => $paddingBottom ?? ""};
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

export const Logo = styled.img<{
  $logoSize?: string | null;
}>`
  width: ${({ $logoSize }) => $logoSize ?? ""};
  object-fit: contain;
  cursor: pointer;
`;

export const Content = styled.div<{
  cursor?: "default" | "pointer" | undefined;
}>`
  cursor: ${({ cursor }) => cursor ?? "default"};
`;
