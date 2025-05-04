import React, { useEffect, useState } from "react";
import { ComponentEntity, ComponentType, SiteEntity } from "@/graphql/generated/types";
import { Section } from "../Section";
import { Header } from "../Header";
import { Inquiry } from "../Inquiry";
import { Footer } from "../Footer";
import { Terms } from "../Terms";
import * as S from "./Container.style";

interface Props {
  data?: SiteEntity;
}

export const Container = ({ data }: Props) => {
  const [sections, setSections] = useState<ComponentEntity[]>([]);
  const [sectionNames, setSectionNames] = useState<string[]>([]);
  const [inquiry, setInquiry] = useState<ComponentEntity>();
  const [openTerms, setOpenTerms] = useState<boolean>(false);

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
    <S.Container $paddingTop={data.header?.height}>
      <Header sectionNames={sectionNames} data={data.header ?? undefined} />

      {data.footer?.terms && openTerms && (
        <Terms isMobile={false} terms={data.footer.terms} handleCloseTerms={handleCloseTerms} />
      )}

      {sections.map((value: ComponentEntity, index: number) => (
        <Section key={index} id={value.name} data={value} />
      ))}
      {inquiry && <Inquiry id={inquiry.name} data={inquiry} siteEmail={data.email} />}
      <Footer data={data.footer ?? undefined} handleOpenTerms={handleOpenTerms} />
    </S.Container>
  );
};
