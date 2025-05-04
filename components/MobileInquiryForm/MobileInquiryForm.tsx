import React, { useState } from "react";
import { useApolloClient } from "@apollo/client";
import { useToastMessage } from "@/hooks";
import {
  BackgroundType,
  ComponentEntity,
  FindOneSiteByIdDocument,
  SiteEntity,
  useUpdateComponentMutation,
  useUploadImageMutation,
} from "@/graphql/generated/types";
import { useFormik } from "formik";
import { PanelButton } from "../PanelButton";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import * as S from "./MobileInquiryForm.style";

interface Props {
  data: ComponentEntity;
  setData: React.Dispatch<React.SetStateAction<SiteEntity | undefined>>;
  handleReset: () => void;
  handleDelete: () => void;
}

export const MobileInquiryForm = ({ data, setData, handleReset, handleDelete }: Props) => {
  const client = useApolloClient();
  const { ToastMessage } = useToastMessage();

  const [open, setOpen] = useState<boolean>(false);

  const [loadUpdateComponent, { loading: updateLoading }] = useUpdateComponentMutation({
    onCompleted: () => {
      client.refetchQueries({ include: [FindOneSiteByIdDocument] });

      ToastMessage("info", "컴포넌트가 수정되었습니다.");
    },
    onError: (e) => {
      ToastMessage("error", `${e.message ?? e}`);
    },
  });

  const [loadUploadImage, { loading: uploadImageLoading }] = useUploadImageMutation({
    onCompleted: (mutationData) => {
      const uploadedImage = mutationData.uploadImage;

      handleChange("componentMobileStyle.background", uploadedImage);
    },
    onError: (e) => {
      ToastMessage("error", `${e.message ?? e}`);
    },
  });

  const handleClickOpenButton = () => {
    setOpen(!open);
  };

  const handleSubmit = () => {
    loadUpdateComponent({
      variables: {
        id: data.id,
        ...formik.values,
      },
    });
  };

  const handleOpenUpload = () => {
    document.getElementById("uploadBackground")?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      loadUploadImage({ variables: { file: selectedFile } });
    }
  };

  const handleChange = (field: string, value: any) => {
    switch (true) {
      case field.startsWith("componentMobileStyle."):
        formik.setFieldValue("componentMobileStyle", {
          ...formik.values.componentMobileStyle,
          [field.replace("componentMobileStyle.", "")]: value,
        });
        break;
      case field.startsWith("titleStyle."):
        formik.setFieldValue("titleStyle", {
          ...formik.values.titleStyle,
          [field.replace("titleStyle.", "")]: value,
        });
        break;
      case field.startsWith("contentStyle."):
        formik.setFieldValue("contentStyle", {
          ...formik.values.contentStyle,
          [field.replace("contentStyle.", "")]: value,
        });
        break;
      default:
        formik.setFieldValue(field, value);
    }

    setData((prev) => {
      if (!prev) return prev;

      const isComponentMobileStyleField = field.startsWith("componentMobileStyle.");
      const isTitleStyleField = field.startsWith("titleStyle.");
      const isContentStyleField = field.startsWith("contentStyle.");
      const isMobileInquiryStyleField = field.startsWith("mobileInquiryStyle.");

      return {
        ...prev,
        components: prev.components?.map((comp) => {
          if (comp.id !== data.id) return comp;

          const updatedComp = { ...comp };

          switch (true) {
            case isComponentMobileStyleField:
              updatedComp.componentMobileStyle = {
                ...comp.componentMobileStyle!,
                [field.replace("componentMobileStyle.", "")]: value,
              };
              break;

            case isTitleStyleField:
              updatedComp.titleStyle = {
                ...comp.titleStyle!,
                [field.replace("titleStyle.", "")]: value,
              };
              break;

            case isContentStyleField:
              updatedComp.contentStyle = {
                ...comp.contentStyle!,
                [field.replace("contentStyle.", "")]: value,
              };
              break;

            case isMobileInquiryStyleField:
              updatedComp.mobileInquiryStyle = {
                ...comp.mobileInquiryStyle!,
                [field.replace("mobileInquiryStyle.", "")]: value,
              };
              break;

            default:
              (updatedComp as any)[field] = value;
          }

          return updatedComp;
        }) as ComponentEntity[],
      } as SiteEntity;
    });
  };

  const clickReset = () => {
    formik.resetForm();
    handleReset();
  };

  const formik = useFormik({
    initialValues: {
      name: data.name,
      componentMobileStyle: {
        height: data.componentMobileStyle?.height ?? "",
        padding: data.componentMobileStyle?.padding ?? "",
        // gap: data.componentMobileStyle?.gap ?? "",
        background: data?.componentMobileStyle?.background ?? "",
        backgroundType: data?.componentMobileStyle?.backgroundType ?? BackgroundType.Color,
      },
      mobileTitle: data?.mobileTitle ?? "",
      titleStyle: {
        mobileSize: data?.titleStyle?.mobileSize ?? "10px",
        mobileColor: data?.titleStyle?.mobileColor ?? "#000",
        mobileMargin: data.titleStyle?.mobileMargin ?? "",
        mobileLineHeight: data.titleStyle?.mobileLineHeight ?? 1,
      },
      mobileContent: data.mobileContent ?? "",
      contentStyle: {
        mobileSize: data?.titleStyle?.mobileSize ?? "10px",
        mobileColor: data?.titleStyle?.mobileColor ?? "#000",
        mobileMargin: data.contentStyle?.mobileMargin ?? "",
        mobileLineHeight: data.contentStyle?.mobileLineHeight ?? 1,
      },
      mobileInquiryStyle: {
        padding: data.mobileInquiryStyle?.padding ?? "",
        gap: data.mobileInquiryStyle?.gap ?? "5px",
        textSize: data.mobileInquiryStyle?.textSize ?? "10px",
        textColor: data.mobileInquiryStyle?.textColor ?? "#000",
        lineHeight: data.mobileInquiryStyle?.lineHeight ?? 1,
        backgroundColor: data.mobileInquiryStyle?.backgroundColor ?? "#fff",
        buttonWidth: data.mobileInquiryStyle?.buttonWidth ?? "100%",
        buttonHeight: data.mobileInquiryStyle?.buttonHeight ?? "40px",
        buttonTextSize: data.mobileInquiryStyle?.buttonTextSize ?? "10px",
        buttonTextColor: data.mobileInquiryStyle?.buttonTextColor ?? "#000",
        buttonColor: data.mobileInquiryStyle?.buttonColor ?? "#fff",
        buttonRadius: data.mobileInquiryStyle?.buttonRadius ?? "",
      },
    },
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <S.ComponentType onClick={handleClickOpenButton} className="cursor-pointer">
        <S.Item>섹션</S.Item>

        {open ? <XMarkIcon className="size-[25px]" /> : <Bars3Icon className="size-[25px]" />}
      </S.ComponentType>

      {open && (
        <>
          {/* 컴포넌트 */}
          <S.ItemBox>
            <S.FontSetting>
              <p className="font-bold">이름</p>
              <S.Input
                value={formik.values.name}
                onChange={(e) => handleChange("name", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>

            <S.FontSetting>
              <p className="font-bold">높이</p>
              <S.Input
                name="componentMobileStyle.height"
                value={formik.values.componentMobileStyle.height ?? undefined}
                onChange={(e) => handleChange("componentMobileStyle.height", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
          </S.ItemBox>

          <S.ItemBox $alignItems="center" $marginTop={10}>
            <p className="font-bold">배경</p>
            <S.BackgroundArea>
              <S.Select
                width="90px"
                value={formik.values.componentMobileStyle.backgroundType}
                onChange={(e) => {
                  handleChange("componentMobileStyle.backgroundType", e.target.value);
                  formik.setFieldValue("componentMobileStyle.background", undefined);
                }}
              >
                <option value={BackgroundType.Color} label="색상" />
                <option value={BackgroundType.Image} label="이미지" />
              </S.Select>
              {formik.values.componentMobileStyle.backgroundType === BackgroundType.Image ? (
                <>
                  <input
                    type="file"
                    id="uploadBackground"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <S.FileInput
                    value={formik.values.componentMobileStyle.background ?? undefined}
                    onClick={handleOpenUpload}
                    placeholder="파일 업로드"
                    width="170px"
                    readOnly
                  />
                </>
              ) : (
                <S.Input
                  value={formik.values.componentMobileStyle.background ?? undefined}
                  onChange={(e) => handleChange("componentMobileStyle.background", e.target.value)}
                  width="170px"
                  $textAlign="center"
                />
              )}
            </S.BackgroundArea>
          </S.ItemBox>

          <S.ItemBox $marginTop={10} $hasBorder>
            <S.FontSetting>
              <p className="font-bold">패딩</p>
              <S.Input
                name="componentMobileStyle.padding"
                value={formik.values.componentMobileStyle.padding ?? undefined}
                onChange={(e) => handleChange("componentMobileStyle.padding", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>

            <S.FontSetting />
          </S.ItemBox>

          {/* 문의 박스 */}
          <S.Item $marginTop={15}>문의 박스</S.Item>
          <S.ItemBox $marginTop={10}>
            <S.FontSetting>
              <p className="font-bold">패딩</p>
              <S.Input
                name="mobileInquiryStyle.padding"
                value={formik.values.mobileInquiryStyle.padding ?? undefined}
                onChange={(e) => handleChange("mobileInquiryStyle.padding", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">갭</p>
              <S.Input
                name="mobileInquiryStyle.gap"
                value={formik.values.mobileInquiryStyle.gap ?? undefined}
                onChange={(e) => handleChange("mobileInquiryStyle.gap", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
          </S.ItemBox>

          <S.ItemBox $marginTop={10}>
            <S.FontSetting>
              <p className="font-bold">배경 색상</p>
              <S.Input
                name="mobileInquiryStyle.backgroundColor"
                value={formik.values.mobileInquiryStyle.backgroundColor ?? undefined}
                onChange={(e) => handleChange("mobileInquiryStyle.backgroundColor", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">텍스트 색상</p>
              <S.Input
                name="mobileInquiryStyle.textColor"
                value={formik.values.mobileInquiryStyle.textColor ?? undefined}
                onChange={(e) => handleChange("mobileInquiryStyle.textColor", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
          </S.ItemBox>

          <S.ItemBox $marginTop={10}>
            <S.FontSetting>
              <p className="font-bold">텍스트 크기</p>
              <S.Input
                name="mobileInquiryStyle.textSize"
                value={formik.values.mobileInquiryStyle.textSize ?? undefined}
                onChange={(e) => handleChange("mobileInquiryStyle.textSize", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">줄 높이</p>
              <S.Input
                type="number"
                name="mobileInquiryStyle.lineHeight"
                value={formik.values.mobileInquiryStyle.lineHeight ?? undefined}
                onChange={(e) =>
                  handleChange("mobileInquiryStyle.lineHeight", parseFloat(e.target.value))
                }
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
          </S.ItemBox>

          <S.ItemBox $marginTop={10}>
            <S.FontSetting>
              <p className="font-bold">버튼 너비</p>
              <S.Input
                name="mobileInquiryStyle.buttonWidth"
                value={formik.values.mobileInquiryStyle.buttonWidth ?? undefined}
                onChange={(e) => handleChange("mobileInquiryStyle.buttonWidth", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">버튼 높이</p>
              <S.Input
                name="mobileInquiryStyle.buttonHeight"
                value={formik.values.mobileInquiryStyle.buttonHeight ?? undefined}
                onChange={(e) => handleChange("mobileInquiryStyle.buttonHeight", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
          </S.ItemBox>

          <S.ItemBox $marginTop={10}>
            <S.FontSetting>
              <p className="font-bold">버튼 색상</p>
              <S.Input
                name="mobileInquiryStyle.buttonColor"
                value={formik.values.mobileInquiryStyle.buttonColor ?? undefined}
                onChange={(e) => handleChange("mobileInquiryStyle.buttonColor", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">버튼 곡률</p>
              <S.Input
                name="mobileInquiryStyle.buttonRadius"
                value={formik.values.mobileInquiryStyle.buttonRadius ?? undefined}
                onChange={(e) => handleChange("mobileInquiryStyle.buttonRadius", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
          </S.ItemBox>

          <S.ItemBox $marginTop={10} $hasBorder>
            <S.FontSetting>
              <p className="font-bold">버튼 텍스트 크기</p>
              <S.Input
                name="mobileInquiryStyle.buttonTextSize"
                value={formik.values.mobileInquiryStyle.buttonTextSize ?? undefined}
                onChange={(e) => handleChange("mobileInquiryStyle.buttonTextSize", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">버튼 텍스트 색상</p>
              <S.Input
                name="mobileInquiryStyle.buttonTextColor"
                value={formik.values.mobileInquiryStyle.buttonTextColor ?? undefined}
                onChange={(e) => handleChange("mobileInquiryStyle.buttonTextColor", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
          </S.ItemBox>

          {/* 제목 */}
          <S.Item $marginTop={15}>제목</S.Item>
          <S.ItemBox $marginTop={5}>
            <p className="font-bold">텍스트</p>
            <S.Input
              value={formik.values.mobileTitle ?? undefined}
              onChange={(e) => handleChange("mobileTitle", e.target.value)}
              width="280px"
            />
          </S.ItemBox>
          <S.ItemBox $marginTop={10}>
            <S.FontSetting>
              <p className="font-bold">텍스트 색상</p>
              <S.Input
                name="titleStyle.mobileColor"
                value={formik.values.titleStyle.mobileColor ?? undefined}
                onChange={(e) => handleChange("titleStyle.mobileColor", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">텍스트 크기</p>
              <S.Input
                name="titleStyle.mobileSize"
                value={formik.values.titleStyle.mobileSize ?? undefined}
                onChange={(e) => handleChange("titleStyle.mobileSize", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
          </S.ItemBox>
          <S.ItemBox $marginTop={10} $hasBorder>
            <S.FontSetting>
              <p className="font-bold">마진</p>
              <S.Input
                name="titleStyle.mobileMargin"
                value={formik.values.titleStyle.mobileMargin ?? undefined}
                onChange={(e) => handleChange("titleStyle.mobileMargin", e.target.value)}
                placeholder="ex) 0 0 0 0"
                width="90px"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">줄 높이</p>
              <S.Input
                type="number"
                name="titleStyle.mobileLineHeight"
                value={formik.values.titleStyle.mobileLineHeight ?? undefined}
                onChange={(e) =>
                  handleChange("titleStyle.mobileLineHeight", parseFloat(e.target.value))
                }
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
          </S.ItemBox>

          {/* 부제목 */}
          <S.Item $marginTop={15}>부제목</S.Item>
          <S.ItemBox $marginTop={10} $alignItems="flex-start">
            <p className="font-bold">텍스트</p>
            <S.Textarea
              value={formik.values.mobileContent ?? undefined}
              onChange={(e) => handleChange("mobileContent", e.target.value)}
              width="280px"
            />
          </S.ItemBox>
          <S.ItemBox $marginTop={10}>
            <S.FontSetting>
              <p className="font-bold">텍스트 색상</p>
              <S.Input
                name="contentStyle.mobileColor"
                value={formik.values.contentStyle.mobileColor ?? undefined}
                onChange={(e) => handleChange("contentStyle.mobileColor", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">텍스트 크기</p>
              <S.Input
                name="contentStyle.mobileSize"
                value={formik.values.contentStyle.mobileSize ?? undefined}
                onChange={(e) => handleChange("contentStyle.mobileSize", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
          </S.ItemBox>
          <S.ItemBox $marginTop={10}>
            <S.FontSetting>
              <p className="font-bold">마진</p>
              <S.Input
                name="contentStyle.mobileMargin"
                value={formik.values.contentStyle.mobileMargin ?? undefined}
                onChange={(e) => handleChange("contentStyle.mobileMargin", e.target.value)}
                placeholder="ex) 0 0 0 0"
                width="90px"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">줄 높이</p>
              <S.Input
                type="number"
                name="contentStyle.mobileLineHeight"
                value={formik.values.contentStyle.mobileLineHeight ?? undefined}
                onChange={(e) =>
                  handleChange("contentStyle.mobileLineHeight", parseFloat(e.target.value))
                }
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
          </S.ItemBox>

          <S.ButtonBox>
            <S.SubmitButton>
              <PanelButton text="삭제" color="#E9455A" textColor="#fff" onClick={handleDelete} />
              <div className="flex gap-x-[10px]">
                <PanelButton text="리셋" onClick={clickReset} />
                <PanelButton text="수정" color="#000" textColor="#fff" onClick={handleSubmit} />
              </div>
            </S.SubmitButton>
          </S.ButtonBox>
        </>
      )}
    </>
  );
};
