import React, { useEffect, useState } from "react";
import { ComponentEntity, ComponentType, SiteEntity } from "@/graphql/generated/types";
import { MobileHeader } from "../MobileHeader";
import { MobileSection } from "../MobileSection";
import { MobileInquiry } from "../MobileInquiry";
import { MobileFooter } from "../MobileFooter";
import { Terms } from "../Terms";
import * as S from "./MobileContainer.style";

interface Props {
  data?: SiteEntity;
}

export const MobileContainer = ({ data }: Props) => {
  const [sections, setSections] = useState<ComponentEntity[]>([]);
  const [sectionNames, setSectionNames] = useState<string[]>([]);
  const [inquiry, setInquiry] = useState<ComponentEntity>();
  const [openTerms, setOpenTerms] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(1);

  const handleZoomButton = () => {
    setZoom(zoom + 0.5);

    if (zoom >= 3) {
      setZoom(1);
    }
  };

  const handleOpenTerms = () => {
    setOpenTerms(true);
  };

  const handleCloseTerms = () => {
    setOpenTerms(false);
  };

  useEffect(() => {
    if (data?.components) {
      const sectionData = data.components.filter(
        (component) => component.componentType === ComponentType.Section
      );

      setSections(sectionData);
      setSectionNames(sectionData.map((section) => section.name));

      const inquiryData = data.components.find(
        (component) => component.componentType === ComponentType.Inquiry
      );

      if (inquiryData) {
        setInquiry(inquiryData);
        setSectionNames((prev) => [...prev, inquiryData.name]);
      }
    }
  }, [data?.components]);

  if (!data) {
    return null;
  }

  return (
    <S.Background>
      {/* <S.ZoomButton>
        <div
          onClick={handleZoomButton}
          className="flex justify-center items-center p-[5px] bg-white rounded-full cursor-pointer"
        >
          <MagnifyingGlassPlusIcon className="size-[50px]" />
        </div>

        <div className="flex justify-center items-center w-[74px] mt-[10px] p-[2px] bg-white rounded-lg leading-1 select-none">
          <XMarkIcon className="size-[20px] mt-[4px]" />
          <p className="text-[20px] font-bold">{zoom}</p>
        </div>
      </S.ZoomButton> */}

      <MobileHeader sectionNames={sectionNames} data={data.mobileHeader ?? undefined} />

      {data.mobileFooter?.terms && openTerms && (
        <Terms
          isMobile={true}
          terms={data.mobileFooter.terms}
          handleCloseTerms={handleCloseTerms}
        />
      )}

      <S.Container $paddingTop={data.mobileHeader?.height} $zoom={zoom}>
        {sections.map((value: ComponentEntity, index: number) => (
          <MobileSection key={index} id={value.name} data={value} />
        ))}
        {inquiry && <MobileInquiry id={inquiry.name} data={inquiry} siteEmail={data.email} />}
        <MobileFooter data={data.mobileFooter ?? undefined} handleOpenTerms={handleOpenTerms} />
      </S.Container>
    </S.Background>
  );
};
