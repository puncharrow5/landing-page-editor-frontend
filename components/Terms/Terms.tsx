import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import * as S from "./Terms.style";

interface Props {
  isMobile: boolean;
  terms?: string;
  handleCloseTerms: () => void;
}

export const Terms = ({ isMobile, terms, handleCloseTerms }: Props) => {
  return (
    <>
      {isMobile ? (
        <S.MobileBackdrop onClick={handleCloseTerms}>
          <S.MobileModal onClick={(e) => e.stopPropagation()}>
            <S.Terms dangerouslySetInnerHTML={{ __html: terms ?? "" }} />
            <XMarkIcon
              onClick={handleCloseTerms}
              className="absolute top-[10px] right-[10px] size-6 text-black cursor-pointer"
            />
          </S.MobileModal>
        </S.MobileBackdrop>
      ) : (
        <S.Backdrop onClick={handleCloseTerms}>
          <S.Modal onClick={(e) => e.stopPropagation()}>
            <S.Terms dangerouslySetInnerHTML={{ __html: terms ?? "" }} />
            <XMarkIcon
              onClick={handleCloseTerms}
              className="absolute top-[10px] right-[10px] size-6 text-black cursor-pointer"
            />
          </S.Modal>
        </S.Backdrop>
      )}
    </>
  );
};
