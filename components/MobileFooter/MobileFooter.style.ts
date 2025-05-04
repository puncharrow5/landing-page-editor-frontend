import styled from "styled-components";
import { MobileFooterEntity } from "@/graphql/generated/types";

export const Container = styled.div<{
  $mobileFooter: MobileFooterEntity | null;
}>`
  display: flex;
  flex-direction: column;
  background-color: ${({ $mobileFooter }) => $mobileFooter?.backgroundColor ?? "#FFF"};
  font-size: ${({ $mobileFooter }) => $mobileFooter?.textSize ?? "10px"};
  color: ${({ $mobileFooter }) => $mobileFooter?.textColor ?? "#000"};
`;

export const Top = styled.div<{ $paddingTop?: string | null }>`
  display: flex;
  flex-direction: column;
  padding: ${({ $paddingTop }) => $paddingTop ?? ""};
  border-bottom: 1px solid #e7e7ec;
`;

export const Grid = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: auto auto;
  gap: 5px 20px;
  width: fit-content;
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
