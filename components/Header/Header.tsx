import React from "react";
import { Link } from "react-scroll";
import { HeaderEntity } from "@/graphql/generated/types";
import * as S from "./Header.style";

interface Props {
  data?: HeaderEntity;
  sectionNames?: string[];
}

export const Header = ({ data, sectionNames }: Props) => {
  return (
    <S.Header
      $height={data?.height}
      $textSize={data?.textSize}
      $textColor={data?.textColor}
      $backgroundColor={data?.backgroundColor}
    >
      {data?.logo ? (
        <S.Logo
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/file/${data.logo}`}
          $logoSize={data?.logoSize}
          alt="로고 이미지"
        />
      ) : (
        <p className="cursor-pointer">{data?.logo ?? "로고"}</p>
      )}

      <S.ItemBox $gap={data?.gap}>
        {sectionNames?.map((value: string, index: number) => (
          <Link
            key={index}
            to={value}
            spy={true}
            smooth={true}
            offset={data?.height ? -data?.height : -80}
          >
            <p className="cursor-pointer">{value}</p>
          </Link>
        ))}
      </S.ItemBox>
    </S.Header>
  );
};
