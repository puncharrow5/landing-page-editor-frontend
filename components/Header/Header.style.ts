import styled from "styled-components";
import { HeaderEntity } from "@/graphql/generated/types";

export const Header = styled.div<{
  $data?: HeaderEntity | null;
}>`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 400px);
  height: ${({ $data }) => ($data?.height ? $data?.height : "80px")};
  top: 0;
  padding: ${({ $data }) => ($data?.padding ? $data.padding : "")};
  font-size: ${({ $data }) => ($data?.textSize ? $data.textSize : "10px")};
  font-weight: bold;
  color: ${({ $data }) => $data?.textColor ?? "#000"};
  background-color: ${({ $data }) =>
    $data?.backgroundColor ? $data.backgroundColor : "transparent"};
  /* border-bottom: 1px solid #e7e7ec; */
`;

export const Logo = styled.img<{
  $logoSize?: string | null;
}>`
  height: ${({ $logoSize }) => ($logoSize ? $logoSize : "100%")};
  cursor: pointer;
`;

export const ItemBox = styled.div<{
  $gap?: string | null;
}>`
  display: flex;
  gap: ${({ $gap }) => $gap ?? "20px"};
`;
