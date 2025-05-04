import React, { useState } from "react";
import { useApolloClient } from "@apollo/client";
import { useToastMessage } from "@/hooks";
import { FindManySiteDocument, useConnectSiteMutation } from "@/graphql/generated/types";
import * as S from "./ConnectForm.style";

interface Props {
  handleCloseRegisterModal: () => void;
}

export const ConnectForm = ({ handleCloseRegisterModal }: Props) => {
  const client = useApolloClient();
  const { ToastMessage } = useToastMessage();

  const [domain, setDomain] = useState("");

  const [loadConnectSite] = useConnectSiteMutation({
    fetchPolicy: "network-only",
    onCompleted: () => {
      client.refetchQueries({ include: [FindManySiteDocument] });

      ToastMessage("info", "사이트가 연결되었습니다.");

      handleCloseRegisterModal();
    },
    onError: (e) => {
      ToastMessage("error", e.message ?? e);
    },
  });

  const handleConnect = () => {
    loadConnectSite({
      variables: {
        domain,
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDomain(e.target.value);
  };

  return (
    <S.Container>
      <S.Title>사이트 연결</S.Title>
      <S.Label>도메인</S.Label>
      <S.Input
        name="domain"
        value={domain}
        onChange={handleChange}
        placeholder="http://domain.com"
      />
      <S.Button onClick={handleConnect}>
        <p>사이트 연결</p>
      </S.Button>
    </S.Container>
  );
};
