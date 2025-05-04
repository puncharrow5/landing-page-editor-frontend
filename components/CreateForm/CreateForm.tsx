import React, { useState } from "react";
import { useApolloClient } from "@apollo/client";
import { useToastMessage } from "@/hooks";
import {
  CreateSiteMutationVariables,
  FindManySiteDocument,
  useCreateSiteMutation,
} from "@/graphql/generated/types";
import * as S from "./CreateForm.style";

interface Props {
  handleCloseRegisterModal: () => void;
}

export const CreateForm = ({ handleCloseRegisterModal }: Props) => {
  const client = useApolloClient();
  const { ToastMessage } = useToastMessage();

  const [createValues, setCreateValues] = useState<CreateSiteMutationVariables>({
    name: "",
    domain: "",
    email: "",
  });

  const [loadCreateSite] = useCreateSiteMutation({
    fetchPolicy: "network-only",
    onCompleted: () => {
      client.refetchQueries({ include: [FindManySiteDocument] });

      ToastMessage("info", "사이트가 생성되었습니다.");

      handleCloseRegisterModal();
    },
    onError: (e) => {
      ToastMessage("error", e.message ?? e);
    },
  });

  const handleSubmit = () => {
    loadCreateSite({
      variables: {
        ...createValues,
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreateValues({
      ...createValues,
      [name]: value,
    });
  };

  return (
    <S.Container>
      <S.Title>사이트 생성</S.Title>
      <S.Label>사이트 이름</S.Label>
      <S.Input
        name="name"
        value={createValues.name}
        onChange={handleChange}
        placeholder="사이트 이름"
      />
      <S.Label>도메인</S.Label>
      <S.Input
        name="domain"
        value={createValues.domain}
        onChange={handleChange}
        placeholder="http://domain.com"
      />
      <S.Label>이메일</S.Label>
      <S.Input
        name="email"
        value={createValues.email}
        onChange={handleChange}
        placeholder="site@email.com"
      />
      <S.Button onClick={handleSubmit}>
        <p>사이트 생성</p>
      </S.Button>
    </S.Container>
  );
};
