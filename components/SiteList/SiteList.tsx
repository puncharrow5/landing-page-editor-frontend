import React, { useState } from "react";
import { useRouter } from "next/router";
import { useFindManySiteQuery } from "@/graphql/generated/types";
import { RegisterModal } from "../RegisterModal";
import { DisconnectModal } from "../DisconnectModal";
import { TrashIcon } from "@heroicons/react/24/outline";
import * as S from "./SiteList.style";

export const SiteList = () => {
  const router = useRouter();

  const [openRegister, setOpenRegister] = useState<boolean>(false);
  const [openDisconnect, setOpenDisconnect] = useState<boolean>(false);
  const [siteId, setSiteId] = useState<number>();

  const { data } = useFindManySiteQuery({ fetchPolicy: "network-only" });

  const handleRoute = (siteId: number) => (e: React.MouseEvent<HTMLDivElement>) => {
    router.push(`/edit/${siteId}`);
  };

  const handleOpenRegisterModal = () => {
    setOpenRegister(true);
  };
  const handleCloseRegisterModal = () => {
    setOpenRegister(false);
  };

  const handleOpenDisconnectModal = (id: number) => (e: React.MouseEvent) => {
    e.stopPropagation();

    setSiteId(id);
    setOpenDisconnect(true);
  };
  const handleCloseDisconnectModal = () => {
    setSiteId(undefined);
    setOpenDisconnect(false);
  };

  return (
    <>
      {openRegister && <RegisterModal handleCloseRegisterModal={handleCloseRegisterModal} />}
      {openDisconnect && (
        <DisconnectModal siteId={siteId} handleCloseDisconnectModal={handleCloseDisconnectModal} />
      )}

      <S.Container>
        <h1 className="text-3xl font-bold">대시보드</h1>
        <div className="flex justify-between items-center mt-6 font-bold">
          <p>등록된 사이트</p>
          <div onClick={handleOpenRegisterModal} className="p-2 border-2 rounded-lg cursor-pointer">
            + 사이트 등록
          </div>
        </div>

        {!!data ? (
          <S.ItemBox>
            {data.findManySite.map((value, index) => (
              <S.Item key={index} onClick={handleRoute(value.id)}>
                <div className="flex flex-col">
                  <S.Name>{value.name}</S.Name>
                  <S.Domain>{value.domain}</S.Domain>
                </div>

                <TrashIcon
                  onClick={handleOpenDisconnectModal(value.id)}
                  className="size-6 cursor-pointer"
                />
              </S.Item>
            ))}
          </S.ItemBox>
        ) : (
          <div>등록된 사이트가 없습니다.</div>
        )}
      </S.Container>
    </>
  );
};
