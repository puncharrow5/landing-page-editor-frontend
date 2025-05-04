import React from "react";
import * as S from "./Child.style";
import { BackgroundType, ChildEntity } from "@/graphql/generated/types";

interface Props {
  data: ChildEntity;
}

export const Child = ({ data }: Props) => {
  return (
    <S.Container
      $childStyle={data.childStyle ?? undefined}
      style={
        data.childStyle?.backgroundType === BackgroundType.Color
          ? {
              backgroundColor: data.childStyle?.background ?? "#FFF",
            }
          : data.childStyle?.backgroundType === BackgroundType.Image
          ? {
              backgroundImage:
                `url(${process.env.NEXT_PUBLIC_BASE_URL}/file/${data.childStyle.background})` ||
                "none",
            }
          : undefined
      }
    >
      <S.Title $childStyle={data.childStyle ?? undefined}>{data.title}</S.Title>
      <S.Content $childStyle={data.childStyle ?? undefined}>{data.content}</S.Content>
    </S.Container>
  );
};
