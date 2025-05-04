import React, { useState } from "react";
import { FooterEntity } from "@/graphql/generated/types";
import { XMarkIcon } from "@heroicons/react/24/outline";
import * as S from "./Footer.style";

interface Props {
  data?: FooterEntity;
  handleOpenTerms: () => void;
}

export const Footer = ({ data, handleOpenTerms }: Props) => {
  return (
    <>
      <S.Container $footer={data ?? null}>
        <S.Top $paddingTop={data?.paddingTop}>
          <S.Grid>
            {data?.logo ? (
              <S.Logo
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/file/${data.logo}`}
                alt="로고 이미지"
              />
            ) : (
              <p className="self-center font-bold cursor-pointer">로고</p>
            )}

            <p dangerouslySetInnerHTML={{ __html: data?.contentTop ?? "" }} />

            {data?.helpCenter && (
              <>
                <p className="self-center font-bold">고객센터</p>
                <p dangerouslySetInnerHTML={{ __html: data?.helpCenter ?? "" }} />
              </>
            )}

            {data?.terms && (
              <>
                <p className="self-center font-bold">약관</p>
                <p onClick={handleOpenTerms} className="cursor-pointer">
                  서비스 이용약관
                </p>
              </>
            )}
          </S.Grid>
        </S.Top>

        <S.Bottom $paddingBottom={data?.paddingBottom}>
          <S.Content dangerouslySetInnerHTML={{ __html: data?.contentBottom ?? "" }} />
        </S.Bottom>
      </S.Container>
    </>
  );
};
