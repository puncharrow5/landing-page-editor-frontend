import React, { useState } from "react";
import { useApolloClient } from "@apollo/client";
import {
  FindOneSiteByIdDocument,
  FooterEntity,
  SiteEntity,
  useUpdateFooterMutation,
  useUploadImageMutation,
} from "@/graphql/generated/types";
import { useFormik } from "formik";
import { PanelButton } from "../PanelButton";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { useToastMessage } from "@/hooks";
import * as S from "./FooterBox.style";

interface Props {
  siteId: number;
  data?: FooterEntity | null;
  setData: React.Dispatch<React.SetStateAction<SiteEntity | undefined>>;
  handleReset: () => void;
}

export const FooterBox = ({ siteId, data, setData, handleReset }: Props) => {
  const client = useApolloClient();
  const { ToastMessage } = useToastMessage();

  const [open, setOpen] = useState<boolean>(false);

  const [loadUpdateFooter, { loading }] = useUpdateFooterMutation({
    onCompleted: () => {
      client.refetchQueries({ include: [FindOneSiteByIdDocument] });

      ToastMessage("info", "푸터가 수정되었습니다.");
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
    loadUpdateFooter({
      variables: { ...formik.values, siteId },
    });
  };

  const handleChange = (field: string, value: any) => {
    formik.setFieldValue(field, value);

    setData((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        footer: {
          ...prev.footer,
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
      footerType: data?.footerType ?? 1,
      logo: data?.logo ?? "",
      logoSize: data?.logoSize ?? "",
      contentTop: data?.contentTop ?? "",
      helpCenter: data?.helpCenter ?? "",
      terms: data?.terms ?? "",
      contentBottom: data?.contentBottom ?? "",
      backgroundColor: data?.backgroundColor ?? "",
      paddingTop: data?.paddingTop ?? "",
      paddingBottom: data?.paddingBottom ?? "",
      textSize: data?.textSize ?? "10px",
      textColor: data?.textColor ?? "#000",
      lineHeight: data?.lineHeight ?? 1,
    },
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });

  return (
    <S.Container onClick={handleClick}>
      <S.SectionName>
        <p className="text-lg">푸터</p>
        {open ? (
          <ChevronUpIcon className="size-6 cursor-pointer" />
        ) : (
          <ChevronDownIcon className="size-6 cursor-pointer" />
        )}
      </S.SectionName>
      {open && (
        <S.Detail onClick={(e) => e.stopPropagation()}>
          <S.ItemBox>
            <S.FontSetting>
              <p className="font-bold">푸터 타입</p>
              <S.Select
                width="90px"
                value={formik.values.footerType}
                onChange={(e) => handleChange("footerType", e.target.value)}
              >
                <option value={1} label="1" />
                <option value={2} label="2" />
              </S.Select>
            </S.FontSetting>
            <S.FontSetting />
          </S.ItemBox>

          <S.ItemBox>
            <S.FontSetting>
              <p className="font-bold">로고 이미지</p>
              <input type="file" id="uploadLogo" className="hidden" onChange={handleFileChange} />
              <S.FileInput
                value={formik.values.logo ?? undefined}
                onClick={handleOpenUpload}
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
              <p className="font-bold">배경 색상</p>
              <S.Input
                value={formik.values.backgroundColor ?? undefined}
                onChange={(e) => handleChange("backgroundColor", e.target.value)}
                width="90px"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">줄 높이</p>
              <S.Input
                type="number"
                value={formik.values.lineHeight ?? undefined}
                onChange={(e) => handleChange("lineHeight", e.target.value)}
                width="90px"
              />
            </S.FontSetting>
          </S.ItemBox>

          <S.ItemBox $hasBorder>
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

          <S.Item>상단</S.Item>
          <S.ItemBox $marginTop={5} $alignItems="flex-start">
            <p className="font-bold">패딩</p>
            <S.Input
              value={formik.values.paddingTop ?? undefined}
              onChange={(e) => handleChange("paddingTop", e.target.value)}
              placeholder="ex) 0 0 0 0"
              width="280px"
            />
          </S.ItemBox>
          <S.ItemBox $marginTop={5} $alignItems="flex-start">
            <p className="font-bold">텍스트</p>
            <S.Textarea
              value={formik.values.contentTop ?? undefined}
              onChange={(e) => handleChange("contentTop", e.target.value)}
              width="280px"
            />
          </S.ItemBox>
          <S.ItemBox $marginTop={5} $alignItems="flex-start">
            <p className="font-bold">고객센터</p>
            <S.Textarea
              value={formik.values.helpCenter ?? undefined}
              onChange={(e) => handleChange("helpCenter", e.target.value)}
              width="280px"
            />
          </S.ItemBox>
          <S.ItemBox $marginTop={5} $alignItems="flex-start" $hasBorder>
            <p className="font-bold">약관</p>
            <S.Textarea
              value={formik.values.terms ?? undefined}
              onChange={(e) => handleChange("terms", e.target.value)}
              width="280px"
            />
          </S.ItemBox>

          <S.Item>하단</S.Item>
          <S.ItemBox $marginTop={5} $alignItems="flex-start">
            <p className="font-bold">패딩</p>
            <S.Input
              value={formik.values.paddingBottom ?? undefined}
              onChange={(e) => handleChange("paddingBottom", e.target.value)}
              placeholder="ex) 0 0 0 0"
              width="280px"
            />
          </S.ItemBox>
          <S.ItemBox $marginTop={5} $alignItems="flex-start">
            <p className="font-bold">텍스트</p>
            <S.Textarea
              value={formik.values.contentBottom ?? undefined}
              onChange={(e) => handleChange("contentBottom", e.target.value)}
              width="280px"
            />
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
