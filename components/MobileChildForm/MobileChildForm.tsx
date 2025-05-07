import React, { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { useToastMessage } from "@/hooks";
import { PanelButton } from "../PanelButton";
import {
  BackgroundType,
  FindOneSiteByIdDocument,
  MobileChildEntity,
  SiteEntity,
  useDeleteMobileChildMutation,
  useUpdateMobileChildMutation,
  useUploadImageMutation,
} from "@/graphql/generated/types";
import { useFormik } from "formik";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import * as S from "./MobileChildForm.style";

interface Props {
  index: number;
  data: MobileChildEntity;
  setData: React.Dispatch<React.SetStateAction<SiteEntity | undefined>>;
  handleReset: () => void;
}

export const MobileChildForm = ({ index, data, setData, handleReset }: Props) => {
  const client = useApolloClient();
  const { ToastMessage } = useToastMessage();

  const [open, setOpen] = useState<boolean>(false);

  const [loadUpdateMobileChild, { loading: updateLoading }] = useUpdateMobileChildMutation({
    onCompleted: () => {
      client.refetchQueries({ include: [FindOneSiteByIdDocument] });

      ToastMessage("info", "컴포넌트가 수정되었습니다.");
    },
    onError: (e) => {
      ToastMessage("error", `${e.message ?? e}`);
    },
  });

  const [loadDeleteMobileChild, { loading: deleteLoading }] = useDeleteMobileChildMutation({
    onCompleted: () => {
      client.refetchQueries({ include: [FindOneSiteByIdDocument] });

      ToastMessage("info", "컴포넌트가 삭제되었습니다.");
    },
    onError: (e) => {
      ToastMessage("error", `${e.message ?? e}`);
    },
  });

  const [loadUploadImage, { loading: uploadImageLoading }] = useUploadImageMutation({
    onCompleted: (mutationData) => {
      const uploadedImage = mutationData.uploadImage;

      handleChange("mobileChildStyle.background", uploadedImage);
    },
    onError: (e) => {
      ToastMessage("error", `${e.message ?? e}`);
    },
  });

  const handleClickOpenButton = () => {
    setOpen(!open);
  };

  const handleSubmit = () => {
    loadUpdateMobileChild({
      variables: {
        id: data.id,
        ...formik.values,
      },
    });
  };

  const handleDelete = () => {
    loadDeleteMobileChild({
      variables: {
        id: data.id,
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
    if (field.startsWith("mobileChildStyle.")) {
      formik.setFieldValue("mobileChildStyle", {
        ...formik.values.mobileChildStyle,
        [field.replace("mobileChildStyle.", "")]: value,
      });
    } else {
      formik.setFieldValue(field, value);
    }

    setData((prev) => {
      if (!prev) return prev;

      const isChildStyleField = field.startsWith("mobileChildStyle.");

      return {
        ...prev,
        components: prev.components?.map((comp) => {
          if (comp.mobileChildren?.some((mobileChild) => mobileChild.id === data.id)) {
            return {
              ...comp,
              mobileChildren: comp.mobileChildren.map((mobileChild) =>
                mobileChild.id === data.id
                  ? {
                      ...mobileChild,
                      ...(isChildStyleField
                        ? {
                            mobileChildStyle: {
                              ...mobileChild.mobileChildStyle!,
                              [field.replace("mobileChildStyle.", "")]: value,
                            },
                          }
                        : {
                            [field]: value,
                          }),
                    }
                  : mobileChild
              ),
            };
          } else {
            return comp;
          }
        }),
      } as SiteEntity;
    });
  };

  const clickReset = () => {
    formik.resetForm();
    handleReset();
  };

  const formik = useFormik({
    initialValues: {
      title: data?.title ?? "",
      content: data.content ?? "",
      mobileChildStyle: {
        width: data.mobileChildStyle?.width ?? "100px",
        height: data.mobileChildStyle?.height ?? "100px",
        margin: data.mobileChildStyle?.margin ?? "",
        padding: data.mobileChildStyle?.padding ?? "",
        background: data?.mobileChildStyle?.background ?? "",
        backgroundType: data?.mobileChildStyle?.backgroundType ?? BackgroundType.Color,
        border: data.mobileChildStyle?.border ?? "",
        borderRadius: data.mobileChildStyle?.borderRadius ?? "",
        titleSize: data.mobileChildStyle?.titleSize ?? "10px",
        titleColor: data.mobileChildStyle?.titleColor ?? "#000",
        titleLineHeight: data.mobileChildStyle?.titleLineHeight ?? 1,
        titleMargin: data.mobileChildStyle?.titleMargin ?? "",
        contentSize: data.mobileChildStyle?.contentSize ?? "10px",
        contentColor: data.mobileChildStyle?.contentColor ?? "#000",
        contentLineHeight: data.mobileChildStyle?.contentLineHeight ?? 1,
        contentMargin: data.mobileChildStyle?.contentMargin ?? "",
      },
    },
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    formik.setFieldValue("mobileChildStyle.background", undefined);
  }, [formik.values.mobileChildStyle.backgroundType]);

  return (
    <S.Container>
      <S.ComponentType>
        <S.Item>
          <div className="flex items-center">
            <p>컴포넌트 {index + 1}</p>
          </div>
        </S.Item>

        {open ? (
          <XMarkIcon className="size-[25px] cursor-pointer" onClick={handleClickOpenButton} />
        ) : (
          <Bars3Icon className="size-[25px] cursor-pointer" onClick={handleClickOpenButton} />
        )}
      </S.ComponentType>

      {open && (
        <>
          <S.ItemBox $alignItems="center" $marginTop={10}>
            <p className="font-bold">배경</p>
            <S.BackgroundArea>
              <S.Select
                width="90px"
                value={formik.values.mobileChildStyle.backgroundType}
                onChange={(e) => handleChange("mobileChildStyle.backgroundType", e.target.value)}
              >
                <option value={BackgroundType.Color} label="색상" />
                <option value={BackgroundType.Image} label="이미지" />
              </S.Select>
              {formik.values.mobileChildStyle.backgroundType === BackgroundType.Image ? (
                <>
                  <input
                    type="file"
                    id="uploadBackground"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <S.FileInput
                    value={formik.values.mobileChildStyle.background ?? undefined}
                    onClick={handleOpenUpload}
                    placeholder="파일 업로드"
                    width="170px"
                    readOnly
                  />
                </>
              ) : (
                <S.Input
                  value={formik.values.mobileChildStyle.background ?? undefined}
                  onChange={(e) => handleChange("mobileChildStyle.background", e.target.value)}
                  width="170px"
                  $textAlign="center"
                />
              )}
            </S.BackgroundArea>
          </S.ItemBox>

          <S.ItemBox $marginTop={10}>
            <S.FontSetting>
              <p className="font-bold">너비</p>
              <S.Input
                name="mobileChildStyle.width"
                value={formik.values.mobileChildStyle.width ?? undefined}
                onChange={(e) => handleChange("mobileChildStyle.width", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">높이</p>
              <S.Input
                name="mobileChildStyle.height"
                value={formik.values.mobileChildStyle.height ?? undefined}
                onChange={(e) => handleChange("mobileChildStyle.height", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
          </S.ItemBox>

          <S.ItemBox $marginTop={10}>
            <S.FontSetting>
              <p className="font-bold">마진</p>
              <S.Input
                name="mobileChildStyle.margin"
                value={formik.values.mobileChildStyle.margin ?? undefined}
                onChange={(e) => handleChange("mobileChildStyle.margin", e.target.value)}
                placeholder="ex) 0 0 0 0"
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">패딩</p>
              <S.Input
                name="mobileChildStyle.padding"
                value={formik.values.mobileChildStyle.padding ?? undefined}
                onChange={(e) => handleChange("mobileChildStyle.padding", e.target.value)}
                placeholder="ex) 0 0 0 0"
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
          </S.ItemBox>

          <S.ItemBox $marginTop={10} $hasBorder>
            <S.FontSetting>
              <p className="font-bold">테두리</p>
              <S.Input
                name="mobileChildStyle.border"
                value={formik.values.mobileChildStyle.border ?? undefined}
                onChange={(e) => handleChange("mobileChildStyle.border", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">테두리 곡률</p>
              <S.Input
                name="mobileChildStyle.borderRadius"
                value={formik.values.mobileChildStyle.borderRadius ?? undefined}
                onChange={(e) => handleChange("mobileChildStyle.borderRadius", e.target.value)}
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
                name="mobileChildStyle.titleColor"
                value={formik.values.mobileChildStyle.titleColor ?? undefined}
                onChange={(e) => handleChange("mobileChildStyle.titleColor", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">텍스트 크기</p>
              <S.Input
                name="mobileChildStyle.titleSize"
                value={formik.values.mobileChildStyle.titleSize ?? undefined}
                onChange={(e) => handleChange("mobileChildStyle.titleSize", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
          </S.ItemBox>
          <S.ItemBox $marginTop={10} $hasBorder>
            <S.FontSetting>
              <p className="font-bold">마진</p>
              <S.Input
                name="mobileChildStyle.titleMargin"
                value={formik.values.mobileChildStyle.titleMargin ?? undefined}
                onChange={(e) => handleChange("mobileChildStyle.titleMargin", e.target.value)}
                placeholder="ex) 0 0 0 0"
                width="90px"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">줄 높이</p>
              <S.Input
                type="number"
                name="mobileChildStyle.titleLineHeight"
                value={formik.values.mobileChildStyle.titleLineHeight ?? undefined}
                onChange={(e) =>
                  handleChange("mobileChildStyle.titleLineHeight", parseFloat(e.target.value))
                }
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
          </S.ItemBox>

          {/* 내용 */}
          <S.Item $marginTop={15}>내용</S.Item>
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
                name="mobileChildStyle.contentColor"
                value={formik.values.mobileChildStyle.contentColor ?? undefined}
                onChange={(e) => handleChange("mobileChildStyle.contentColor", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">텍스트 크기</p>
              <S.Input
                name="mobileChildStyle.contentSize"
                value={formik.values.mobileChildStyle.contentSize ?? undefined}
                onChange={(e) => handleChange("mobileChildStyle.contentSize", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
          </S.ItemBox>
          <S.ItemBox $marginTop={10}>
            <S.FontSetting>
              <p className="font-bold">마진</p>
              <S.Input
                name="mobileChildStyle.contentMargin"
                value={formik.values.mobileChildStyle.contentMargin ?? undefined}
                onChange={(e) => handleChange("mobileChildStyle.contentMargin", e.target.value)}
                placeholder="ex) 0 0 0 0"
                width="90px"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">줄 높이</p>
              <S.Input
                type="number"
                name="mobileChildStyle.contentLineHeight"
                value={formik.values.mobileChildStyle.contentLineHeight ?? undefined}
                onChange={(e) =>
                  handleChange("mobileChildStyle.contentLineHeight", parseFloat(e.target.value))
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
    </S.Container>
  );
};
