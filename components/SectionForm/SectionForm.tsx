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
import * as S from "./SectionForm.style";

interface Props {
  data: ComponentEntity;
  setData: React.Dispatch<React.SetStateAction<SiteEntity | undefined>>;
  handleReset: () => void;
  handleDelete: () => void;
}

export const SectionForm = ({ data, setData, handleReset, handleDelete }: Props) => {
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
      default:
        formik.setFieldValue(field, value);
    }

    setData((prev) => {
      if (!prev) return prev;

      const isComponentStyleField = field.startsWith("componentStyle.");
      const isTitleStyleField = field.startsWith("titleStyle.");
      const isContentStyleField = field.startsWith("contentStyle.");

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
        padding: data.componentStyle?.padding ?? "",
        gap: data.componentStyle?.gap ?? "",
        grid: data.componentStyle?.grid ?? 1,
        background: data?.componentStyle?.background ?? "",
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
            <p className="font-bold">이름</p>
            <S.Input
              value={formik.values.name}
              onChange={(e) => handleChange("name", e.target.value)}
              width="280px"
              $textAlign="center"
            />
          </S.ItemBox>
          <S.ItemBox $alignItems="center" $marginTop={10}>
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
          <S.ItemBox $marginTop={10}>
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
            <S.FontSetting>
              <p className="font-bold">패딩</p>
              <S.Input
                name="componentStyle.padding"
                value={formik.values.componentStyle.padding ?? undefined}
                onChange={(e) => handleChange("componentStyle.padding", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
          </S.ItemBox>
          <S.ItemBox $marginTop={10} $hasBorder>
            <S.FontSetting>
              <p className="font-bold">갭</p>
              <S.Input
                name="componentStyle.gap"
                value={formik.values.componentStyle.gap ?? undefined}
                onChange={(e) => handleChange("componentStyle.gap", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">그리드</p>
              <S.Input
                type="number"
                name="componentStyle.grid"
                value={formik.values.componentStyle.grid ?? 1}
                onChange={(e) => handleChange("componentStyle.grid", Number(e.target.value))}
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
