import React, { useState } from "react";
import { useApolloClient } from "@apollo/client";
import {
  FindOneSiteByIdDocument,
  MobileHeaderEntity,
  SiteEntity,
  useUpdateMobileHeaderMutation,
  useUploadImageMutation,
} from "@/graphql/generated/types";
import { useFormik } from "formik";
import { PanelButton } from "../PanelButton";
import { useToastMessage } from "@/hooks";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import * as S from "./MobileHeaderBox.style";

interface Props {
  siteId: number;
  data?: MobileHeaderEntity | null;
  setData: React.Dispatch<React.SetStateAction<SiteEntity | undefined>>;
  handleReset: () => void;
}

export const MobileHeaderBox = ({ siteId, data, setData, handleReset }: Props) => {
  const client = useApolloClient();
  const { ToastMessage } = useToastMessage();

  const [open, setOpen] = useState<boolean>(false);

  const [loadUpdateMobileHeader, { loading }] = useUpdateMobileHeaderMutation({
    onCompleted: () => {
      client.refetchQueries({ include: [FindOneSiteByIdDocument] });

      ToastMessage("info", "헤더가 수정되었습니다.");
    },
    onError: (e) => {
      ToastMessage("error", `${e.message ?? e}`);
    },
  });

  const [loadUploadLogo, { loading: uploadLogoLoading }] = useUploadImageMutation({
    onCompleted: (mutationData) => {
      const uploadedImage = mutationData.uploadImage;

      handleChange("logo", uploadedImage);
    },
    onError: (e) => {
      ToastMessage("error", `${e.message ?? e}`);
    },
  });

  const [loadUploadButton, { loading: uploadButtonLoading }] = useUploadImageMutation({
    onCompleted: (mutationData) => {
      const uploadedImage = mutationData.uploadImage;

      handleChange("button", uploadedImage);
    },
    onError: (e) => {
      ToastMessage("error", `${e.message ?? e}`);
    },
  });

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleOpenUploadLogo = () => {
    document.getElementById("uploadLogo")?.click();
  };

  const handleOpenUploadButton = () => {
    document.getElementById("uploadButton")?.click();
  };

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      loadUploadLogo({ variables: { file: selectedFile } });
    }
  };

  const handleButtonFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      loadUploadButton({ variables: { file: selectedFile } });
    }
  };

  const handleSubmit = () => {
    loadUpdateMobileHeader({
      variables: { ...formik.values, siteId },
    });
  };

  const handleChange = (field: string, value: any) => {
    formik.setFieldValue(field, value);

    setData((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        mobileHeader: {
          ...prev.mobileHeader,
          [field]: value,
        },
      } as SiteEntity;
    });
  };

  const clickReset = () => {
    formik.resetForm();
    handleReset();
  };

  const formik = useFormik({
    initialValues: {
      logo: data?.logo ?? "",
      logoSize: data?.logoSize ?? "100%",
      button: data?.button ?? "",
      buttonSize: data?.buttonSize ?? "100%",
      height: data?.height ?? "",
      padding: data?.padding ?? "",
      menuPadding: data?.menuPadding ?? "",
      backgroundColor: data?.backgroundColor ?? "#fff",
      menuBackgroundColor: data?.menuBackgroundColor ?? "#fff",
      textColor: data?.textColor ?? "#000",
      textSize: data?.textSize ?? "",
    },
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });

  return (
    <S.Container onClick={handleOpen}>
      <S.SectionName>
        <p className="text-lg">헤더</p>
        {open ? <ChevronUpIcon className="size-6" /> : <ChevronDownIcon className="size-6" />}
      </S.SectionName>
      {open && (
        <S.Detail onClick={(e) => e.stopPropagation()}>
          {/* 헤더 */}
          <S.Item>헤더</S.Item>

          <S.ItemBox>
            <S.FontSetting>
              <p className="font-bold">로고 이미지</p>
              <input
                type="file"
                id="uploadLogo"
                className="hidden"
                onChange={handleLogoFileChange}
              />
              <S.FileInput
                value={formik.values.logo ?? undefined}
                onClick={handleOpenUploadLogo}
                placeholder="파일 업로드"
                width="90px"
                readOnly
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">로고 사이즈</p>
              <S.Input
                value={formik.values.logoSize ?? undefined}
                onChange={(e) => handleChange("logoSize", e.target.value)}
                width="90px"
              />
            </S.FontSetting>
          </S.ItemBox>

          <S.ItemBox>
            <S.FontSetting>
              <p className="font-bold">헤더 색상</p>
              <S.Input
                value={formik.values.backgroundColor ?? undefined}
                onChange={(e) => handleChange("backgroundColor", e.target.value)}
                width="90px"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">헤더 높이</p>
              <S.Input
                value={formik.values.height ?? undefined}
                onChange={(e) => handleChange("height", e.target.value)}
                width="90px"
              />
            </S.FontSetting>
          </S.ItemBox>

          <S.ItemBox>
            <S.FontSetting>
              <p className="font-bold">버튼 이미지</p>
              <input
                type="file"
                id="uploadButton"
                className="hidden"
                onChange={handleButtonFileChange}
              />
              <S.FileInput
                value={formik.values.button ?? undefined}
                onClick={handleOpenUploadButton}
                placeholder="파일 업로드"
                width="90px"
                readOnly
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">버튼 사이즈</p>
              <S.Input
                value={formik.values.buttonSize ?? undefined}
                onChange={(e) => handleChange("buttonSize", e.target.value)}
                width="90px"
              />
            </S.FontSetting>
          </S.ItemBox>

          <S.ItemBox $hasBorder>
            <S.FontSetting>
              <p className="font-bold">패딩</p>
              <S.Input
                value={formik.values.padding ?? undefined}
                onChange={(e) => handleChange("padding", e.target.value)}
                width="90px"
              />
            </S.FontSetting>
            <S.FontSetting />
          </S.ItemBox>

          {/* 메뉴 */}
          <S.Item $marginTop={10}>메뉴</S.Item>

          <S.ItemBox>
            <S.FontSetting>
              <p className="font-bold">메뉴 색상</p>
              <S.Input
                value={formik.values.menuBackgroundColor ?? undefined}
                onChange={(e) => handleChange("menuBackgroundColor", e.target.value)}
                width="90px"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">패딩</p>
              <S.Input
                value={formik.values.menuPadding ?? undefined}
                onChange={(e) => handleChange("menuPadding", e.target.value)}
                width="90px"
              />
            </S.FontSetting>
          </S.ItemBox>

          <S.ItemBox>
            <S.FontSetting>
              <p className="font-bold">텍스트 색상</p>
              <S.Input
                value={formik.values.textColor ?? undefined}
                onChange={(e) => handleChange("textColor", e.target.value)}
                width="90px"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">텍스트 크기</p>
              <S.Input
                value={formik.values.textSize ?? undefined}
                onChange={(e) => handleChange("textSize", e.target.value)}
                width="90px"
              />
            </S.FontSetting>
          </S.ItemBox>

          <S.ButtonBox>
            <PanelButton text="리셋" onClick={clickReset} />
            <PanelButton text="수정" color="#000" textColor="#fff" onClick={handleSubmit} />
          </S.ButtonBox>
        </S.Detail>
      )}
    </S.Container>
  );
};
