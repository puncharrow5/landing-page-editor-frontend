import styled from "styled-components";

export const Header = styled.div<{
  $height?: string | null;
  $textSize?: string | null;
  $textColor?: string | null;
  $backgroundColor?: string | null;
}>`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 400px);
  height: ${({ $height }) => ($height ? $height : "80px")};
  top: 0;
  padding: 0 40px;
  font-size: ${({ $textSize }) => ($textSize ? $textSize : "10px")};
  font-weight: bold;
  color: ${({ $textColor }) => ($textColor ? $textColor : "#000")};
  background-color: ${({ $backgroundColor }) => $backgroundColor ?? "transparent"};
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
