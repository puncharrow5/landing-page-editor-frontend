import React, { useState } from "react";
import { MobileFooterEntity } from "@/graphql/generated/types";
import * as S from "./MobileFooter.style";

interface Props {
  data?: MobileFooterEntity;
  handleOpenTerms: () => void;
}

export const MobileFooter = ({ data, handleOpenTerms }: Props) => {
  return (
    <>
      <S.Container $mobileFooter={data ?? null}>
        <S.Top $paddingTop={data?.paddingTop}>
          {data?.logo ? (
            <S.Logo
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/file/${data.logo}`}
              alt="로고 이미지"
              $logoSize={data?.logoSize}
              className="mb-[5px]"
            />
          ) : (
            <p className="mb-[5px] font-bold cursor-pointer">로고</p>
          )}

          <p dangerouslySetInnerHTML={{ __html: data?.contentTop ?? "" }} className="mb-[5px]" />

          <S.Grid>
            {data?.helpCenter && (
              <>
                <p className="self-start font-bold">고객센터</p>
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
