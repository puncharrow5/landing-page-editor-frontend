import React, { useState } from "react";
import { BackgroundType, ComponentEntity } from "@/graphql/generated/types";
import * as S from "./MobileInquiry.style";

interface Props {
  id: string;
  data: ComponentEntity;
  siteEmail: string;
}

export const MobileInquiry = ({ id, data, siteEmail }: Props) => {
  const [emailForm, setEmailForm] = useState({
    email: "",
    phoneNumber: "",
    content: "",
    siteEmail,
  });

  const handleChange = (key: string) => (e: any) => {
    setEmailForm({
      ...emailForm,
      [key]: key === "phoneNumber" ? e.target.value.replace(/\D/g, "") : e.target.value,
    });
  };

  return (
    <S.Container
      id={id}
      $componentMobileStyle={data.componentMobileStyle || undefined}
      style={
        data.componentMobileStyle?.backgroundType === BackgroundType.Color
          ? {
              backgroundColor: data.componentMobileStyle.background ?? "#FFF",
            }
          : data.componentMobileStyle?.backgroundType === BackgroundType.Image
          ? {
              backgroundImage:
                `url(${process.env.NEXT_PUBLIC_BASE_URL}/file/${data.componentMobileStyle.background})` ||
                "none",
            }
          : undefined
      }
    >
      <S.Box
        $componentMobileStyle={data.componentMobileStyle || undefined}
        $mobileInquiryStyle={data.mobileInquiryStyle || undefined}
      >
        <S.Title $titleStyle={data.titleStyle ?? undefined}>{data.mobileTitle}</S.Title>
        <S.Content
          $contentStyle={data.contentStyle ?? undefined}
          dangerouslySetInnerHTML={{ __html: data.mobileContent ?? "" }}
        />

        <S.Form
          $textSize={data.contentStyle?.size ?? undefined}
          $gap={data.mobileInquiryStyle?.gap || undefined}
        >
          <label className="">이메일</label>
          <input
            value={emailForm.email}
            onChange={handleChange("email")}
            placeholder="abc@gmail.com"
            className="p-3 border rounded-md"
          />

          <label className="">전화번호</label>
          <input
            value={emailForm.phoneNumber}
            onChange={handleChange("phoneNumber")}
            placeholder="01012341234"
            className="p-3 border rounded-md"
          />

          <label className="">문의내용</label>
          <textarea
            value={emailForm.content}
            onChange={handleChange("content")}
            placeholder="최소 10자 이상 작성해주세요."
            className="h-[200px] p-3 border rounded-md resize-none"
          />

          <S.Button $mobileInquiryStyle={data.mobileInquiryStyle ?? undefined}>문의하기</S.Button>
        </S.Form>
      </S.Box>
    </S.Container>
  );
};
