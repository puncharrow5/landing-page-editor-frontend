import React, { useState } from "react";
import { useApolloClient } from "@apollo/client";
import {
  ChildEntity,
  ComponentEntity,
  FindOneSiteByIdDocument,
  MobileChildEntity,
  SiteEntity,
  useCreateChildMutation,
  useCreateMobileChildMutation,
  useDeleteComponentMutation,
} from "@/graphql/generated/types";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { useToastMessage } from "@/hooks";
import { ChildForm } from "../ChildForm";
import { SectionForm } from "../SectionForm";
import { MobileSectionForm } from "../MobileSectionForm";
import { InquiryForm } from "../InquiryForm";
import { MobileInquiryForm } from "../MobileInquiryForm";
import { MobileChildForm } from "../MobileChildForm";
import { PanelButton } from "../PanelButton";
import * as S from "./SectionBox.style";

interface Props {
  isMobile?: boolean;
  data: ComponentEntity;
  setData: React.Dispatch<React.SetStateAction<SiteEntity | undefined>>;
  handleReset: () => void;
}

export const SectionBox = ({ isMobile, data, setData, handleReset }: Props) => {
  const client = useApolloClient();
  const { ToastMessage } = useToastMessage();

  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const [loadDeleteComponent, { loading: deleteLoading }] = useDeleteComponentMutation({
    onCompleted: () => {
      client.refetchQueries({ include: [FindOneSiteByIdDocument] });

      ToastMessage("info", "컴포넌트가 삭제되었습니다.");
    },
    onError: (e) => {
      ToastMessage("error", `${e.message ?? e}`);
    },
  });

  const [loadCreateChild, { loading: createLoading }] = useCreateChildMutation({
    onCompleted: () => {
      client.refetchQueries({ include: [FindOneSiteByIdDocument] });

      ToastMessage("info", "컴포넌트가 생성되었습니다.");
    },
    onError: (e) => {
      ToastMessage("error", `${e.message ?? e}`);
    },
  });

  const [loadCreateMobileChild, { loading: createMobileChild }] = useCreateMobileChildMutation({
    onCompleted: () => {
      client.refetchQueries({ include: [FindOneSiteByIdDocument] });

      ToastMessage("info", "컴포넌트가 생성되었습니다.");
    },
    onError: (e) => {
      ToastMessage("error", `${e.message ?? e}`);
    },
  });

  const handleDelete = () => {
    loadDeleteComponent({
      variables: {
        id: data.id,
      },
    });
  };

  const handleCreateChild = () => {
    if (isMobile) {
      loadCreateMobileChild({
        variables: {
          componentId: data.id,
        },
      });
    } else {
      loadCreateChild({
        variables: {
          componentId: data.id,
        },
      });
    }
  };

  const RenderedForm = isMobile
    ? data.componentType === "INQUIRY"
      ? MobileInquiryForm
      : MobileSectionForm
    : data.componentType === "INQUIRY"
    ? InquiryForm
    : SectionForm;

  <RenderedForm
    data={data}
    setData={setData}
    handleReset={handleReset}
    handleDelete={handleDelete}
  />;

  return (
    <S.Container onClick={handleClick}>
      <S.SectionName>
        <p className="text-lg">{data.name}</p>
        {open ? (
          <ChevronUpIcon className="size-6 cursor-pointer" />
        ) : (
          <ChevronDownIcon className="size-6 cursor-pointer" />
        )}
      </S.SectionName>

      {open && (
        <S.Detail onClick={(e) => e.stopPropagation()}>
          <RenderedForm
            data={data}
            setData={setData}
            handleReset={handleReset}
            handleDelete={handleDelete}
          />

          {isMobile ? (
            <>
              {data.mobileChildren &&
                data.mobileChildren.map((value: MobileChildEntity, index: number) => (
                  <MobileChildForm
                    key={index}
                    data={value}
                    setData={setData}
                    handleReset={handleReset}
                    index={index}
                  />
                ))}
            </>
          ) : (
            <>
              {data.children &&
                data.children.map((value: ChildEntity, index: number) => (
                  <ChildForm
                    key={index}
                    data={value}
                    setData={setData}
                    handleReset={handleReset}
                    index={index}
                  />
                ))}
            </>
          )}

          {data.componentType === "SECTION" && (
            <S.AddButton>
              <PanelButton
                text="+ 컴포넌트"
                color="#E9455A"
                width="100%"
                textColor="#fff"
                onClick={handleCreateChild}
              />
            </S.AddButton>
          )}
        </S.Detail>
      )}
    </S.Container>
  );
};
