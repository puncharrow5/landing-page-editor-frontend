import React, { useState } from "react";
import { Link } from "react-scroll";
import { MobileHeaderEntity } from "@/graphql/generated/types";
import * as S from "./MobileHeader.style";

interface Props {
  data?: MobileHeaderEntity;
  sectionNames?: string[];
}

export const MobileHeader = ({ data, sectionNames }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <S.Container>
      <S.Header
        $height={data?.height}
        $textColor={data?.textColor}
        $padding={data?.padding}
        $backgroundColor={data?.backgroundColor}
      >
        {data?.logo ? (
          <S.Logo
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/file/${data.logo}`}
            $logoSize={data?.logoSize}
            alt="로고 이미지"
          />
        ) : (
          <p className="cursor-pointer">로고</p>
        )}

        {data?.button ? (
          <S.Button
            onClick={handleClick}
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/file/${data.button}`}
            $buttonSize={data?.buttonSize}
            alt="버튼 이미지"
          />
        ) : (
          <p onClick={handleClick} className="cursor-pointer">
            버튼
          </p>
        )}
      </S.Header>

      {open && (
        <S.Backdrop onClick={handleClose}>
          <S.Menu $top={data?.height} $backgroundColor={data?.menuBackgroundColor}>
            {sectionNames?.map((value: string, index: number) => (
              <Link
                key={index}
                to={value}
                spy={true}
                smooth={true}
                offset={data?.height ? -data?.height : -80}
                onClick={handleClose}
              >
                <S.Item $padding={data?.menuPadding} $textSize={data?.textSize}>
                  {value}
                </S.Item>
              </Link>
            ))}
          </S.Menu>
        </S.Backdrop>
      )}
    </S.Container>
  );
};
