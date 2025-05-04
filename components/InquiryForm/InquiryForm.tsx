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
import * as S from "./InquiryForm.style";

interface Props {
  data: ComponentEntity;
  setData: React.Dispatch<React.SetStateAction<SiteEntity | undefined>>;
  handleReset: () => void;
  handleDelete: () => void;
}

export const InquiryForm = ({ data, setData, handleReset, handleDelete }: Props) => {
  const client = useApolloClient();
  const { ToastMessage } = useToastMessage();

  const [open, setOpen] = useState<boolean>(false);

  const [loadUpdateComponent, { loading: updateLoading }] = useUpdateComponentMutation({
    onCompleted: () => {
      client.refetchQueries({ include: [FindOneSiteByIdDocument] });

      ToastMessage("info", "섹션이 수정되었습니다.");
    },
    onError: (e) => {
      ToastMessage("error", `${e.message ?? e}`);
    },
  });

  const [loadUploadImage, { loading: uploadImageLoading }] = useUploadImageMutation({
    onCompleted: (mutationData) => {
      const uploadedImage = mutationData.uploadImage;

      handleChange("componentStyle.background", uploadedImage);
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
      case field.startsWith("componentStyle."):
        formik.setFieldValue("componentStyle", {
          ...formik.values.componentStyle,
          [field.replace("componentStyle.", "")]: value,
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
      case field.startsWith("inquiryStyle."):
        formik.setFieldValue("inquiryStyle", {
          ...formik.values.inquiryStyle,
          [field.replace("inquiryStyle.", "")]: value,
        });
        break;
      default:
        formik.setFieldValue(field, value);
    }

    setData((prev) => {
      if (!prev) return prev;

      const isComponentStyleField = field.startsWith("componentStyle.");
      const isTitleStyleField = field.startsWith("titleStyle.");
      const isContentStyleField = field.startsWith("contentStyle.");
      const isInquiryStyleField = field.startsWith("inquiryStyle.");

      return {
        ...prev,
        components: prev.components?.map((comp) => {
          if (comp.id !== data.id) return comp;

          const updatedComp = { ...comp };

          switch (true) {
            case isComponentStyleField:
              updatedComp.componentStyle = {
                ...comp.componentStyle!,
                [field.replace("componentStyle.", "")]: value,
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

            case isInquiryStyleField:
              updatedComp.inquiryStyle = {
                ...comp.inquiryStyle!,
                [field.replace("inquiryStyle.", "")]: value,
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
    handleReset();

    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      name: data.name,
      componentStyle: {
        height: data.componentStyle?.height ?? "",
        // padding: data.componentStyle?.padding ?? "",
        // gap: data.componentStyle?.gap ?? "",
        background: data?.componentStyle?.background ?? "#fff",
        backgroundType: data?.componentStyle?.backgroundType ?? BackgroundType.Color,
      },
      title: data?.title ?? "",
      titleStyle: {
        size: data?.titleStyle?.size ?? "10px",
        color: data?.titleStyle?.color ?? "#000",
        margin: data.titleStyle?.margin ?? "",
        lineHeight: data.titleStyle?.lineHeight ?? 1,
      },
      content: data.content ?? "",
      contentStyle: {
        size: data.contentStyle?.size ?? "10px",
        color: data?.contentStyle?.color ?? "#000",
        margin: data.contentStyle?.margin ?? "",
        lineHeight: data.contentStyle?.lineHeight ?? 1,
      },
      inquiryStyle: {
        padding: data.inquiryStyle?.padding ?? "",
        gap: data.inquiryStyle?.gap ?? "5px",
        textSize: data.inquiryStyle?.textSize ?? "10px",
        textColor: data.inquiryStyle?.textColor ?? "#000",
        lineHeight: data.inquiryStyle?.lineHeight ?? 1,
        backgroundColor: data.inquiryStyle?.backgroundColor ?? "#fff",
        buttonWidth: data.inquiryStyle?.buttonWidth ?? "100%",
        buttonHeight: data.inquiryStyle?.buttonHeight ?? "40px",
        buttonTextSize: data.inquiryStyle?.buttonTextSize ?? "10px",
        buttonTextColor: data.inquiryStyle?.buttonTextColor ?? "#000",
        buttonColor: data.inquiryStyle?.buttonColor ?? "#fff",
        buttonRadius: data.inquiryStyle?.buttonRadius ?? "",
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
                name="componentStyle.height"
                value={formik.values.componentStyle.height ?? undefined}
                onChange={(e) => handleChange("componentStyle.height", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
          </S.ItemBox>

          <S.ItemBox $alignItems="center" $marginTop={10} $hasBorder>
            <p className="font-bold">배경</p>
            <S.BackgroundArea>
              <S.Select
                width="90px"
                value={formik.values.componentStyle.backgroundType}
                onChange={(e) => {
                  handleChange("componentStyle.backgroundType", e.target.value);
                  formik.setFieldValue("componentStyle.background", undefined);
                }}
              >
                <option value={BackgroundType.Color} label="색상" />
                <option value={BackgroundType.Image} label="이미지" />
              </S.Select>
              {formik.values.componentStyle.backgroundType === BackgroundType.Image ? (
                <>
                  <input
                    type="file"
                    id="uploadBackground"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <S.FileInput
                    value={formik.values.componentStyle.background ?? undefined}
                    onClick={handleOpenUpload}
                    placeholder="파일 업로드"
                    width="170px"
                    readOnly
                  />
                </>
              ) : (
                <S.Input
                  value={formik.values.componentStyle.background ?? undefined}
                  onChange={(e) => handleChange("componentStyle.background", e.target.value)}
                  width="170px"
                  $textAlign="center"
                />
              )}
            </S.BackgroundArea>
          </S.ItemBox>

          {/* 문의 박스 */}
          <S.Item $marginTop={15}>문의 박스</S.Item>
          <S.ItemBox $marginTop={10}>
            <S.FontSetting>
              <p className="font-bold">패딩</p>
              <S.Input
                name="inquiryStyle.padding"
                value={formik.values.inquiryStyle.padding ?? undefined}
                onChange={(e) => handleChange("inquiryStyle.padding", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">갭</p>
              <S.Input
                name="inquiryStyle.gap"
                value={formik.values.inquiryStyle.gap ?? undefined}
                onChange={(e) => handleChange("inquiryStyle.gap", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
          </S.ItemBox>

          <S.ItemBox $marginTop={10}>
            <S.FontSetting>
              <p className="font-bold">배경 색상</p>
              <S.Input
                name="inquiryStyle.backgroundColor"
                value={formik.values.inquiryStyle.backgroundColor ?? undefined}
                onChange={(e) => handleChange("inquiryStyle.backgroundColor", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">텍스트 색상</p>
              <S.Input
                name="inquiryStyle.textColor"
                value={formik.values.inquiryStyle.textColor ?? undefined}
                onChange={(e) => handleChange("inquiryStyle.textColor", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
          </S.ItemBox>

          <S.ItemBox $marginTop={10}>
            <S.FontSetting>
              <p className="font-bold">텍스트 크기</p>
              <S.Input
                name="inquiryStyle.textSize"
                value={formik.values.inquiryStyle.textSize ?? undefined}
                onChange={(e) => handleChange("inquiryStyle.textSize", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">줄 높이</p>
              <S.Input
                type="number"
                name="inquiryStyle.lineHeight"
                value={formik.values.inquiryStyle.lineHeight ?? undefined}
                onChange={(e) =>
                  handleChange("inquiryStyle.lineHeight", parseFloat(e.target.value))
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
                name="inquiryStyle.buttonWidth"
                value={formik.values.inquiryStyle.buttonWidth ?? undefined}
                onChange={(e) => handleChange("inquiryStyle.buttonWidth", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">버튼 높이</p>
              <S.Input
                name="inquiryStyle.buttonHeight"
                value={formik.values.inquiryStyle.buttonHeight ?? undefined}
                onChange={(e) => handleChange("inquiryStyle.buttonHeight", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
          </S.ItemBox>

          <S.ItemBox $marginTop={10}>
            <S.FontSetting>
              <p className="font-bold">버튼 색상</p>
              <S.Input
                name="inquiryStyle.buttonColor"
                value={formik.values.inquiryStyle.buttonColor ?? undefined}
                onChange={(e) => handleChange("inquiryStyle.buttonColor", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">버튼 곡률</p>
              <S.Input
                name="inquiryStyle.buttonRadius"
                value={formik.values.inquiryStyle.buttonRadius ?? undefined}
                onChange={(e) => handleChange("inquiryStyle.buttonRadius", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
          </S.ItemBox>

          <S.ItemBox $marginTop={10} $hasBorder>
            <S.FontSetting>
              <p className="font-bold">버튼 텍스트 크기</p>
              <S.Input
                name="inquiryStyle.buttonTextSize"
                value={formik.values.inquiryStyle.buttonTextSize ?? undefined}
                onChange={(e) => handleChange("inquiryStyle.buttonTextSize", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">버튼 텍스트 색상</p>
              <S.Input
                name="inquiryStyle.buttonTextColor"
                value={formik.values.inquiryStyle.buttonTextColor ?? undefined}
                onChange={(e) => handleChange("inquiryStyle.buttonTextColor", e.target.value)}
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
              value={formik.values.title ?? undefined}
              onChange={(e) => handleChange("title", e.target.value)}
              width="280px"
            />
          </S.ItemBox>
          <S.ItemBox $marginTop={10}>
            <S.FontSetting>
              <p className="font-bold">텍스트 색상</p>
              <S.Input
                name="titleStyle.color"
                value={formik.values.titleStyle.color ?? undefined}
                onChange={(e) => handleChange("titleStyle.color", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">텍스트 크기</p>
              <S.Input
                name="titleStyle.size"
                value={formik.values.titleStyle.size ?? undefined}
                onChange={(e) => handleChange("titleStyle.size", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
          </S.ItemBox>
          <S.ItemBox $marginTop={10} $hasBorder>
            <S.FontSetting>
              <p className="font-bold">마진</p>
              <S.Input
                name="titleStyle.margin"
                value={formik.values.titleStyle.margin ?? undefined}
                onChange={(e) => handleChange("titleStyle.margin", e.target.value)}
                placeholder="ex) 0 0 0 0"
                width="90px"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">줄 높이</p>
              <S.Input
                type="number"
                name="titleStyle.lineHeight"
                value={formik.values.titleStyle.lineHeight ?? undefined}
                onChange={(e) => handleChange("titleStyle.lineHeight", parseFloat(e.target.value))}
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
              value={formik.values.content ?? undefined}
              onChange={(e) => handleChange("content", e.target.value)}
              width="280px"
            />
          </S.ItemBox>
          <S.ItemBox $marginTop={10}>
            <S.FontSetting>
              <p className="font-bold">텍스트 색상</p>
              <S.Input
                name="contentStyle.color"
                value={formik.values.contentStyle.color ?? undefined}
                onChange={(e) => handleChange("contentStyle.color", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">텍스트 크기</p>
              <S.Input
                name="contentStyle.size"
                value={formik.values.contentStyle.size ?? undefined}
                onChange={(e) => handleChange("contentStyle.size", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
          </S.ItemBox>
          <S.ItemBox $marginTop={10}>
            <S.FontSetting>
              <p className="font-bold">마진</p>
              <S.Input
                name="contentStyle.margin"
                value={formik.values.contentStyle.margin ?? undefined}
                onChange={(e) => handleChange("contentStyle.margin", e.target.value)}
                placeholder="ex) 0 0 0 0"
                width="90px"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">줄 높이</p>
              <S.Input
                type="number"
                name="contentStyle.lineHeight"
                value={formik.values.contentStyle.lineHeight ?? undefined}
                onChange={(e) =>
                  handleChange("contentStyle.lineHeight", parseFloat(e.target.value))
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
