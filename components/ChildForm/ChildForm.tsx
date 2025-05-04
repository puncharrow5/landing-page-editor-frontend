import React, { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { useToastMessage } from "@/hooks";
import { PanelButton } from "../PanelButton";
import {
  BackgroundType,
  ChildEntity,
  FindOneSiteByIdDocument,
  SiteEntity,
  useDeleteChildMutation,
  useUpdateChildMutation,
  useUploadImageMutation,
} from "@/graphql/generated/types";
import { useFormik } from "formik";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import * as S from "./ChildForm.style";

interface Props {
  index: number;
  data: ChildEntity;
  setData: React.Dispatch<React.SetStateAction<SiteEntity | undefined>>;
  handleReset: () => void;
}

export const ChildForm = ({ index, data, setData, handleReset }: Props) => {
  const client = useApolloClient();
  const { ToastMessage } = useToastMessage();

  const [open, setOpen] = useState<boolean>(false);

  const [loadUpdateChild, { loading: updateLoading }] = useUpdateChildMutation({
    onCompleted: () => {
      client.refetchQueries({ include: [FindOneSiteByIdDocument] });

      ToastMessage("info", "컴포넌트가 수정되었습니다.");
    },
    onError: (e) => {
      ToastMessage("error", `${e.message ?? e}`);
    },
  });

  const [loadDeleteChild, { loading: deleteLoading }] = useDeleteChildMutation({
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

      handleChange("childStyle.background", uploadedImage);
    },
    onError: (e) => {
      ToastMessage("error", `${e.message ?? e}`);
    },
  });

  const handleClickOpenButton = () => {
    setOpen(!open);
  };

  const handleSubmit = () => {
    loadUpdateChild({
      variables: {
        id: data.id,
        ...formik.values,
      },
    });
  };

  const handleDelete = () => {
    loadDeleteChild({
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
    if (field.startsWith("childStyle.")) {
      formik.setFieldValue("childStyle", {
        ...formik.values.childStyle,
        [field.replace("childStyle.", "")]: value,
      });
    } else {
      formik.setFieldValue(field, value);
    }

    setData((prev) => {
      if (!prev) return prev;

      const isChildStyleField = field.startsWith("childStyle.");

      return {
        ...prev,
        components: prev.components?.map((comp) => {
          if (comp.children?.some((child) => child.id === data.id)) {
            return {
              ...comp,
              children: comp.children.map((child) =>
                child.id === data.id
                  ? {
                      ...child,
                      ...(isChildStyleField
                        ? {
                            childStyle: {
                              ...child.childStyle!,
                              [field.replace("childStyle.", "")]: value,
                            },
                          }
                        : {
                            [field]: value,
                          }),
                    }
                  : child
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
      childStyle: {
        width: data.childStyle?.width ?? "100px",
        height: data.childStyle?.height ?? "100px",
        margin: data.childStyle?.margin ?? "",
        padding: data.childStyle?.padding ?? "",
        background: data?.childStyle?.background ?? "#fff",
        backgroundType: data?.childStyle?.backgroundType ?? BackgroundType.Color,
        border: data.childStyle?.border ?? "",
        borderRadius: data.childStyle?.borderRadius ?? "",
        titleSize: data.childStyle?.titleSize ?? "10px",
        titleColor: data.childStyle?.titleColor ?? "#000",
        titleLineHeight: data.childStyle?.titleLineHeight ?? 1,
        titleMargin: data.childStyle?.titleMargin ?? "",
        contentSize: data.childStyle?.contentSize ?? "10px",
        contentColor: data.childStyle?.contentColor ?? "#000",
        contentLineHeight: data.childStyle?.contentLineHeight ?? 1,
        contentMargin: data.childStyle?.contentMargin ?? "",
      },
    },
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    formik.setFieldValue("childStyle.background", undefined);
  }, [formik.values.childStyle.backgroundType]);

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
                value={formik.values.childStyle.backgroundType}
                onChange={(e) => handleChange("childStyle.backgroundType", e.target.value)}
              >
                <option value={BackgroundType.Color} label="색상" />
                <option value={BackgroundType.Image} label="이미지" />
              </S.Select>
              {formik.values.childStyle.backgroundType === BackgroundType.Image ? (
                <>
                  <input
                    type="file"
                    id="uploadBackground"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <S.FileInput
                    value={formik.values.childStyle.background ?? undefined}
                    onClick={handleOpenUpload}
                    placeholder="파일 업로드"
                    width="170px"
                    readOnly
                  />
                </>
              ) : (
                <S.Input
                  value={formik.values.childStyle.background ?? undefined}
                  onChange={(e) => handleChange("childStyle.background", e.target.value)}
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
                name="childStyle.width"
                value={formik.values.childStyle.width ?? undefined}
                onChange={(e) => handleChange("childStyle.width", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">높이</p>
              <S.Input
                name="childStyle.height"
                value={formik.values.childStyle.height ?? undefined}
                onChange={(e) => handleChange("childStyle.height", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
          </S.ItemBox>

          <S.ItemBox $marginTop={10}>
            <S.FontSetting>
              <p className="font-bold">마진</p>
              <S.Input
                name="childStyle.margin"
                value={formik.values.childStyle.margin ?? undefined}
                onChange={(e) => handleChange("childStyle.margin", e.target.value)}
                placeholder="ex) 0 0 0 0"
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">패딩</p>
              <S.Input
                name="childStyle.padding"
                value={formik.values.childStyle.padding ?? undefined}
                onChange={(e) => handleChange("childStyle.padding", e.target.value)}
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
                name="childStyle.border"
                value={formik.values.childStyle.border ?? undefined}
                onChange={(e) => handleChange("childStyle.border", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">테두리 곡률</p>
              <S.Input
                name="childStyle.borderRadius"
                value={formik.values.childStyle.borderRadius ?? undefined}
                onChange={(e) => handleChange("childStyle.borderRadius", e.target.value)}
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
                name="childStyle.titleColor"
                value={formik.values.childStyle.titleColor ?? undefined}
                onChange={(e) => handleChange("childStyle.titleColor", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">텍스트 크기</p>
              <S.Input
                type="number"
                name="childStyle.titleSize"
                value={formik.values.childStyle.titleSize ?? undefined}
                onChange={(e) => handleChange("childStyle.titleSize", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
          </S.ItemBox>
          <S.ItemBox $marginTop={10} $hasBorder>
            <S.FontSetting>
              <p className="font-bold">마진</p>
              <S.Input
                name="childStyle.titleMargin"
                value={formik.values.childStyle.titleMargin ?? undefined}
                onChange={(e) => handleChange("childStyle.titleMargin", e.target.value)}
                placeholder="ex) 0 0 0 0"
                width="90px"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">줄 높이</p>
              <S.Input
                type="number"
                name="childStyle.titleLineHeight"
                value={formik.values.childStyle.titleLineHeight ?? undefined}
                onChange={(e) =>
                  handleChange("childStyle.titleLineHeight", parseFloat(e.target.value))
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
                name="childStyle.contentColor"
                value={formik.values.childStyle.contentColor ?? undefined}
                onChange={(e) => handleChange("childStyle.contentColor", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">텍스트 크기</p>
              <S.Input
                type="number"
                name="childStyle.contentSize"
                value={formik.values.childStyle.contentSize ?? undefined}
                onChange={(e) => handleChange("childStyle.contentSize", e.target.value)}
                width="90px"
                $textAlign="center"
              />
            </S.FontSetting>
          </S.ItemBox>
          <S.ItemBox $marginTop={10}>
            <S.FontSetting>
              <p className="font-bold">마진</p>
              <S.Input
                name="childStyle.contentMargin"
                value={formik.values.childStyle.contentMargin ?? undefined}
                onChange={(e) => handleChange("childStyle.contentMargin", e.target.value)}
                placeholder="ex) 0 0 0 0"
                width="90px"
              />
            </S.FontSetting>
            <S.FontSetting>
              <p className="font-bold">줄 높이</p>
              <S.Input
                type="number"
                name="childStyle.contentLineHeight"
                value={formik.values.childStyle.contentLineHeight ?? undefined}
                onChange={(e) =>
                  handleChange("childStyle.contentLineHeight", parseFloat(e.target.value))
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
