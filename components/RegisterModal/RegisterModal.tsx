import React, { useState } from "react";
import { ConnectForm } from "../ConnectForm";
import { CreateForm } from "../CreateForm";
import { ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import * as S from "./RegisterModal.style";

type Step = "FirstStep" | "Create" | "Link";

interface Props {
  handleCloseRegisterModal: () => void;
}

export const RegisterModal = ({ handleCloseRegisterModal }: Props) => {
  const [step, setStep] = useState<Step>("FirstStep");

  const renderModalContent = () => {
    switch (step) {
      case "FirstStep":
        return (
          <S.FirstStep>
            <S.Title fontSize={24}>사이트 등록</S.Title>
            <S.Button onClick={() => setStep("Create")}>
              <p className="font-bold">사이트 생성</p>
              <ChevronRightIcon className="size-4" />
            </S.Button>
            <S.Button onClick={() => setStep("Link")}>
              <p className="font-bold">사이트 연결</p>
              <ChevronRightIcon className="size-4" />
            </S.Button>
          </S.FirstStep>
        );
      case "Create":
        return <CreateForm handleCloseRegisterModal={handleCloseRegisterModal} />;
      case "Link":
        return <ConnectForm handleCloseRegisterModal={handleCloseRegisterModal} />;
    }
  };

  return (
    <S.Backdrop onClick={handleCloseRegisterModal}>
      <S.Box onClick={(e) => e.stopPropagation()}>
        <XMarkIcon
          onClick={handleCloseRegisterModal}
          className="absolute size-8 top-4 right-6 cursor-pointer"
        />

        {renderModalContent()}
      </S.Box>
    </S.Backdrop>
  );
};
