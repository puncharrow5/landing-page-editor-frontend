import React from "react";
import {
  FindAdminDocument,
  useFindAdminQuery,
  useFindManyHistoryQuery,
  useLogoutMutation,
  useUpdateProfileImageMutation,
  useUploadImageMutation,
} from "@/graphql/generated/types";
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";
import { useToastMessage } from "@/hooks";
import { CameraIcon } from "@heroicons/react/24/outline";
import * as S from "./AdminInfo.style";
import { UserIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { useApolloClient } from "@apollo/client";

export const AdminInfo = () => {
  const client = useApolloClient();
  const router = useRouter();
  const { ToastMessage } = useToastMessage();

  const { data: adminData, refetch } = useFindAdminQuery({ fetchPolicy: "network-only" });

  const { data: historyData, fetchMore } = useFindManyHistoryQuery({
    variables: { skip: 0, take: 10 },
    fetchPolicy: "network-only",
  });

  const [loadUpdateProfileImage, { loading: uploadImageLoading }] = useUpdateProfileImageMutation({
    onCompleted: (mutationData) => {
      client.refetchQueries({ include: [FindAdminDocument] });

      ToastMessage("success", "프로필 사진이 변경되었습니다.");
    },
    onError: (e) => {
      ToastMessage("error", `${e.message ?? e}`);
    },
  });

  const [loadLogout, { loading: logoutLoading }] = useLogoutMutation({
    onCompleted: () => {
      ToastMessage("info", "로그아웃 되었습니다.");

      refetch();
    },
    onError: (e) => {
      ToastMessage("error", `${e.message ?? e}`);
    },
  });

  const handleLogout = () => {
    loadLogout();
  };

  const handleOpenUpload = () => {
    document.getElementById("uploadProfileImage")?.click();
  };

  const handleProfileImageUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      loadUpdateProfileImage({ variables: { file: selectedFile } });
    }
  };

  const fetchMoreHistory = () => {
    if (Number(historyData?.findManyHistory?.length ?? 0) > 0) {
      fetchMore({
        variables: {
          skip: historyData?.findManyHistory.length,
          take: 10,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          return Object.assign({}, prev, {
            findManyHistory: [...prev.findManyHistory, ...fetchMoreResult.findManyHistory],
          });
        },
      });
    }
  };

  return (
    <S.Container>
      <S.BoxTop>
        <div className="flex justify-between items-center">
          <p className="text-3xl font-bold">관리자 정보</p>
          <button
            onClick={handleLogout}
            className="px-[8px] py-[5px] bg-[#E9455A] text-[14px] rounded-lg cursor-pointer"
          >
            로그아웃
          </button>
        </div>

        <div className="flex flex-row items-center mt-[30px]">
          <div
            className="relative flex justify-center items-center w-[120px] h-[120px] bg-gray-200 border-gray-300 border-[1px] rounded-xl overflow-hidden"
            style={
              adminData?.findAdmin.profileImage
                ? {
                    backgroundImage:
                      `url(${process.env.NEXT_PUBLIC_BASE_URL}/file/${adminData.findAdmin.profileImage})` ||
                      "none",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }
                : {
                    backgroundColor: "#e5e7eb",
                  }
            }
          >
            {!adminData?.findAdmin.profileImage && (
              <UserIcon className="absolute bottom-[-15px] size-[120px] text-[10px] text-white" />
            )}

            <div
              onClick={handleOpenUpload}
              className="absolute flex justify-center items-center bottom-[5px] right-[5px] w-[25px] h-[25px] bg-white rounded-full cursor-pointer"
            >
              <input
                type="file"
                id="uploadProfileImage"
                className="hidden"
                onChange={handleProfileImageUpdate}
              />
              <CameraIcon className="size-[18px]" />
            </div>
          </div>

          <div className="w-[1px] h-[100px] bg-gray-200 mx-[30px]" />

          <div className="flex flex-col">
            <p className="text-[24px] font-bold">{adminData?.findAdmin.name}</p>
            <p className="mt-[5px] text-[14px]">{adminData?.findAdmin.email}</p>
            <p className="text-[14px]">{adminData?.findAdmin.role?.name}</p>
            <p className="text-[14px]">{adminData?.findAdmin.role?.description}</p>
          </div>
        </div>
      </S.BoxTop>

      <S.BoxBottom>
        <p className="text-3xl font-bold ">최근 활동 내역</p>
        <div id="historyBox" className="flex flex-col h-full mt-[20px] pr-[10px] overflow-y-auto">
          <InfiniteScroll
            scrollableTarget="historyBox"
            dataLength={historyData?.findManyHistory?.length ?? 0}
            next={fetchMoreHistory}
            hasMore={true}
            loader={""}
          >
            {historyData?.findManyHistory.map((value, index) => (
              <S.Item key={`history_${index}`}>
                <div className="leading-[1]">
                  <S.Name>{value.site?.name}</S.Name>
                  <S.Domain>{value.site?.domain}</S.Domain>
                  <S.Description>{value.description}</S.Description>
                </div>

                <div>
                  <S.Date>{dayjs(value.createdAt).format("YYYY.MM.DD HH:mm")}</S.Date>
                </div>
              </S.Item>
            ))}
          </InfiniteScroll>
        </div>
      </S.BoxBottom>
    </S.Container>
  );
};
