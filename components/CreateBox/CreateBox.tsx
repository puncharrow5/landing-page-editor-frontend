import React, { useState } from "react";
import * as S from "./CreateBox.style";
import { PanelButton } from "../PanelButton";
import {
  ComponentType,
  CreateComponentMutationVariables,
  FindOneSiteByIdDocument,
  useCreateComponentMutation,
} from "@/graphql/generated/types";
import client from "@/config/client";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useToastMessage } from "@/hooks";

interface Props {
  siteId: number;
  handleCloseCreateBox: () => void;
}

export const CreateBox = ({ siteId, handleCloseCreateBox }: Props) => {
  const { ToastMessage } = useToastMessage();

  const [variables, setVariables] = useState<CreateComponentMutationVariables>({
    siteId,
    componentType: ComponentType.Section,
    name: "",
  });

  const [loadCreateComponent, { loading }] = useCreateComponentMutation({
    onCompleted: () => {
      client.refetchQueries({ include: [FindOneSiteByIdDocument] });

      ToastMessage("info", "컴포넌트가 생성되었습니다.");

      setVariables({
        siteId,
        componentType: ComponentType.Section,
        name: "",
      });
    },
    onError: (e) => {
      ToastMessage("error", `${e.message ?? e}`);
    },
  });

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVariables({
      ...variables,
      name: e.target.value,
    });
  };

  const handleChangeComponentType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVariables({
      ...variables,
      componentType: e.target.value as ComponentType,
    });
  };

  const handleSubmit = () => {
    if (!variables.name) {
      return ToastMessage("error", "컴포넌트 이름을 입력해주세요.");
    }

    loadCreateComponent({ variables });
  };

  return (
    <S.Container>
      <div className="flex justify-between items-center">
        <p className="font-bold">컴포넌트 생성</p>
        <XMarkIcon onClick={handleCloseCreateBox} className="size-5 cursor-pointer" />
      </div>

      <div className="flex justify-between mt-4 text-sm">
        <S.Select value={variables.componentType} onChange={handleChangeComponentType}>
          <option value={ComponentType.Section} label="섹션" />
          <option value={ComponentType.Inquiry} label="문의" />
        </S.Select>
        <S.Input value={variables.name} placeholder="컴포넌트 이름" onChange={handleChangeName} />
      </div>

      <S.ButtonBox>
        <PanelButton text="생성" onClick={handleSubmit} color="#000" textColor="#FFF" />
      </S.ButtonBox>
    </S.Container>
  );
};
