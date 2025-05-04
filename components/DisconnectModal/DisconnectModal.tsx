import React from "react";
import { useApolloClient } from "@apollo/client";
import { useToastMessage } from "@/hooks";
import { FindManySiteDocument, useDisconnectSiteMutation } from "@/graphql/generated/types";
import { XMarkIcon } from "@heroicons/react/24/outline";
import * as S from "./DisconnectModal.style";

interface Props {
  siteId?: number;
  handleCloseDisconnectModal: () => void;
}

export const DisconnectModal = ({ siteId, handleCloseDisconnectModal }: Props) => {
  const client = useApolloClient();
  const { ToastMessage } = useToastMessage();

  const [loadDisconnectSite] = useDisconnectSiteMutation({
    fetchPolicy: "network-only",
    onCompleted: () => {
      client.refetchQueries({ include: [FindManySiteDocument] });

      ToastMessage("info", "연결이 해제되었습니다.");

      handleCloseDisconnectModal();
    },
    onError: (e) => {
      ToastMessage("error", e.message ?? e);
    },
  });

  const handleDisconnect = () => {
    if (!siteId) {
      return;
    }

    loadDisconnectSite({
      variables: {
        id: siteId,
      },
    });
  };

  return (
    <S.Backdrop onClick={handleCloseDisconnectModal}>
      <S.Box onClick={(e) => e.stopPropagation()}>
        <XMarkIcon
          onClick={handleCloseDisconnectModal}
          className="absolute size-8 top-4 right-6 cursor-pointer"
        />
        <S.Title>사이트 연결 해제</S.Title>
        <S.Label>연결을 해제하시겠습니까?</S.Label>
        <S.Button onClick={handleDisconnect}>
          <p>확인</p>
        </S.Button>
      </S.Box>
    </S.Backdrop>
  );
};
