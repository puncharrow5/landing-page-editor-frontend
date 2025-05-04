import styled from "styled-components";

export const Button = styled.button<{ $width?: string; $color?: string; $textColor?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $width }) => $width ?? undefined};
  padding: 5px 15px;
  background-color: ${({ $color }) => $color ?? "#fff"};
  font-weight: bold;
  color: ${({ $textColor }) => $textColor ?? "#000"};
  border-radius: 5px;
`;
