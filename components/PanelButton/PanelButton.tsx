import React from "react";
import * as S from "./PanelButton.style";

interface Props {
  text: string;
  textColor?: string;
  width?: string;
  color?: string;
  onClick: () => void;
}

export const PanelButton = ({ text, textColor, width, color, onClick }: Props) => {
  return (
    <S.Button $width={width} $color={color} $textColor={textColor} onClick={onClick}>
      {text}
    </S.Button>
  );
};
