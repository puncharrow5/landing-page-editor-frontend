import React, { useState } from "react";
import { useApolloClient } from "@apollo/client";
import { useToastMessage } from "@/hooks";
import {
  FindOneSiteByIdDocument,
  HeaderEntity,
  SiteEntity,
  useUpdateHeaderMutation,
  useUploadImageMutation,
} from "@/graphql/generated/types";
import { useFormik } from "formik";
import { PanelButton } from "../PanelButton";
import * as S from "./HeaderBox.style";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

interface Props {
  siteId: number;
  data?: HeaderEntity | null;
  setData: React.Dispatch<React.SetStateAction<SiteEntity | undefined>>;
  handleReset: () => void;
}

export const HeaderBox = ({ siteId, data, setData, handleReset }: Props) => {
  const client = useApolloClient();
  const { ToastMessage } = useToastMessage();

  const [open, setOpen] = useState<boolean>(false);

  const [loadUpdateHeader, { loading }] = useUpdateHeaderMutation({
    onCompleted: () => {
      client.refetchQueries({ include: [FindOneSiteByIdDocument] });

      ToastMessage("info", "헤더가 수정되었습니다.");
    },
    onError: (e) => {
      ToastMessage("error", `${e.message ?? e}`);
    },
  });

  const [loadUploadImage, { loading: uploadImageLoading }] = useUploadImageMutation({
    onCompleted: (mutationData) => {
      const uploadedImage = mutationData.uploadImage;

      handleChange("logo", uploadedImage);
    },
    onError: (e) => {
      ToastMessage("error", `${e.message ?? e}`);
    },
  });

  const handleClick = () => {
    setOpen(!open);
  };

  const handleOpenUpload = () => {
    document.getElementById("uploadLogo")?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      loadUploadImage({ variables: { file: selectedFile } });
    }
  };

  const handleSubmit = () => {
    loadUpdateHeader({
      variables: { ...formik.values, siteId },
    });
  };

  const handleChange = (field: string, value: any) => {
    formik.setFieldValue(field, value);

    setData((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        header: {
          ...prev.header,
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
      height: data?.height ?? "",
      padding: data?.padding ?? undefined,
      gap: data?.gap ?? "",
      backgroundColor: data?.backgroundColor ?? "#fff",
      textColor: data?.textColor ?? "#000",
      textSize: data?.textSize ?? "",
    },
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });

  return (
    <S.Container onClick={handleClick}>
      <S.SectionName>
        <p className="text-lg">헤더</p>
        {open ? <ChevronUpIcon className="size-6" /> : <ChevronDownIcon className="size-6" />}
      </S.SectionName>
      {open && (
        <S.Detail onClick={(e) => e.stopPropagation()}>
          <S.ItemBox>
            <S.FontSetting>
              <p className="font-bold">로고 이미지</p>
              <input type="file" id="uploadLogo" className="hidden" onChange={handleFileChange} />
              <S.FileInput
                value={formik.values.logo ?? undefined}
                onClick={handleOpenUpload}
                placeholder="파일 업로드"
                width="90px"
                readOnly
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">이미지 크기</p>
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
              <p className="font-bold">패딩</p>
              <S.Input
                value={formik.values.padding ?? undefined}
                onChange={(e) => handleChange("padding", e.target.value)}
                width="90px"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">갭</p>
              <S.Input
                value={formik.values.gap ?? undefined}
                onChange={(e) => handleChange("gap", e.target.value)}
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
