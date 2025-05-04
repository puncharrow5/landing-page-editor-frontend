import React from "react";
import { BackgroundType, ChildEntity, ComponentEntity } from "@/graphql/generated/types";
import * as S from "./MobileSection.style";
import { MobileChild } from "../MobileChild";

interface Props {
  data: ComponentEntity;
  id: string;
}

export const MobileSection = ({ data, id }: Props) => {
  return (
    <S.Container
      id={id}
      $height={data.componentMobileStyle?.height || undefined}
      $padding={data.componentMobileStyle?.padding || undefined}
      style={
        data.componentMobileStyle?.backgroundType === BackgroundType.Color
          ? {
              backgroundColor: data.componentMobileStyle.background ?? "#FFF",
            }
          : data.componentMobileStyle?.backgroundType === BackgroundType.Image
          ? {
              backgroundImage:
                `url(${process.env.NEXT_PUBLIC_BASE_URL}/file/${data.componentMobileStyle.background})` ||
                "none",
            }
          : undefined
      }
    >
      <S.Title $titleStyle={data.titleStyle ?? undefined}>{data.mobileTitle}</S.Title>
      <S.Content
        $contentStyle={data.contentStyle ?? undefined}
        dangerouslySetInnerHTML={{ __html: data.mobileContent ?? "" }}
      />
      <S.ChildrenBox>
        {data.mobileChildren &&
          data.mobileChildren.map((value: ChildEntity, index: number) => (
            <MobileChild key={index} data={value} />
          ))}
      </S.ChildrenBox>
    </S.Container>
  );
};
