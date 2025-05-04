import React from "react";
import { BackgroundType, MobileChildEntity } from "@/graphql/generated/types";
import * as S from "./MobileChild.style";

interface Props {
  data: MobileChildEntity;
}

export const MobileChild = ({ data }: Props) => {
  return (
    <S.Container
      $mobileChildStyle={data.mobileChildStyle ?? undefined}
      style={
        data.mobileChildStyle?.backgroundType === BackgroundType.Color
          ? {
              backgroundColor: data.mobileChildStyle?.background ?? "#FFF",
            }
          : data.mobileChildStyle?.backgroundType === BackgroundType.Image
          ? {
              backgroundImage:
                `url(${process.env.NEXT_PUBLIC_BASE_URL}/file/${data.mobileChildStyle.background})` ||
                "none",
            }
          : undefined
      }
    >
      <S.Title $mobileChildStyle={data.mobileChildStyle ?? undefined}>{data.title}</S.Title>
      <S.Content $mobileChildStyle={data.mobileChildStyle ?? undefined}>{data.content}</S.Content>
    </S.Container>
  );
};
