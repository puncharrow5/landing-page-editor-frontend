import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  display: flex;
  width: 375px;
  top: 0;
  z-index: 1;
  transform-origin: top center;
`;

export const Header = styled.div<{
  $height?: string | null;
  $textColor?: string | null;
  $backgroundColor?: string | null;
  $padding?: string | null;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${({ $height }) => ($height ? $height : "80px")};
  top: 0;
  padding: ${({ $padding }) => $padding ?? undefined};
  background-color: ${({ $backgroundColor }) => $backgroundColor ?? undefined};
  z-index: 1;
  /* border-bottom: 1px solid #e7e7ec; */
`;

export const Backdrop = styled.div`
  display: flex;
  position: fixed;
  justify-content: center;
  width: 375px;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Menu = styled.div<{
  $top?: string | null;
  $textSize?: string | null;
  $textColor?: string | null;
  $backgroundColor?: string | null;
}>`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 375px;
  top: ${({ $top }) => ($top ? $top : "80px")};
  font-size: ${({ $textSize }) => ($textSize ? $textSize : "10px")};
  color: ${({ $textColor }) => $textColor ?? "#000"};
  background-color: ${({ $backgroundColor }) => $backgroundColor ?? "#fff"};
`;

export const Logo = styled.img<{
  $logoSize?: string | null;
}>`
  height: ${({ $logoSize }) => ($logoSize ? $logoSize : "100%")};
  cursor: pointer;
`;

export const Button = styled.img<{
  $buttonSize?: string | null;
}>`
  height: ${({ $buttonSize }) => ($buttonSize ? $buttonSize : "100%")};
  cursor: pointer;
`;

export const Item = styled.div<{
  $padding?: string | null;
  $textSize?: string | null;
}>`
  display: flex;
  align-items: center;
  padding: ${({ $padding }) => $padding ?? undefined};
  font-size: ${({ $textSize }) => ($textSize ? $textSize : "10px")};
  font-weight: bold;
  cursor: pointer;
`;
