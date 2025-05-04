import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ComponentEntity, ComponentType, SiteEntity } from "@/graphql/generated/types";
import { CreateBox } from "../CreateBox";
import { SectionBox } from "../SectionBox";
import { HeaderBox } from "../HeaderBox";
import { MobileHeaderBox } from "../MobileHeaderBox";
import { FooterBox } from "../FooterBox";
import { MobileFooterBox } from "../MobileFooterBox";
import {
  AdjustmentsHorizontalIcon,
  DevicePhoneMobileIcon,
  DocumentPlusIcon,
  ComputerDesktopIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import * as S from "./SidePanel.style";

interface Props {
  isMobile: boolean;
  data?: SiteEntity;
  setData: React.Dispatch<React.SetStateAction<SiteEntity | undefined>>;
  handleReset: () => void;
  handleSetDesktop: () => void;
  handleSetMobile: () => void;
}

export const SidePanel = ({
  isMobile,
  data,
  setData,
  handleReset,
  handleSetDesktop,
  handleSetMobile,
}: Props) => {
  const router = useRouter();

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openCreateBox, setOpenCreateBox] = useState<boolean>(false);
  const [sections, setSections] = useState<ComponentEntity[]>([]);

  const handleMouseEnter = () => {
    setOpenMenu(true);
  };
  const handleMouseLeave = () => {
    setOpenMenu(false);
  };

  const handleOpenCreateBox = () => {
    setOpenCreateBox(true);
  };
  const handleCloseCreateBox = () => {
    setOpenCreateBox(false);
  };

  const handleGoDashboard = () => {
    router.push("/dashboard");
  };

  useEffect(() => {
    if (data?.components) {
      const sectionData = data.components.filter(
        (component) => component.componentType === ComponentType.Section
      );
      setSections(sectionData);

      const inquiryData = data.components.find(
        (component) => component.componentType === ComponentType.Inquiry
      );
      if (inquiryData) {
        setSections((prev) => [...prev, inquiryData]);
      }
    }
  }, [data?.components]);

  if (!data) {
    return null;
  }

  return (
    <S.Container>
      <S.TitleBox>
        <div className="flex flex-col">
          <p className="text-xl font-bold">{data?.name}</p>
          <p className="text-md text-gray-500">{data?.domain}</p>
        </div>

        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <AdjustmentsHorizontalIcon className="relative size-9 cursor-pointer" />
          {openMenu && (
            <S.Menu>
              <S.MenuItem onClick={handleSetDesktop}>
                <ComputerDesktopIcon className="size-4" />
                <p>데스크탑</p>
              </S.MenuItem>
              <S.Line />
              <S.MenuItem onClick={handleSetMobile}>
                <DevicePhoneMobileIcon className="size-4" />
                <p>모바일</p>
              </S.MenuItem>
              <S.Line />
              <S.MenuItem onClick={handleOpenCreateBox}>
                <DocumentPlusIcon className="size-4" />
                <p>컴포넌트 생성</p>
              </S.MenuItem>
              <S.Line />
              <S.MenuItem onClick={handleGoDashboard}>
                <ArrowRightStartOnRectangleIcon className="size-4" />
                <p>대시보드</p>
              </S.MenuItem>
            </S.Menu>
          )}
        </div>
      </S.TitleBox>
      {openCreateBox && <CreateBox siteId={data.id} handleCloseCreateBox={handleCloseCreateBox} />}

      <S.ComponentBox>
        {isMobile ? (
          <>
            <MobileHeaderBox
              siteId={data.id}
              data={data.mobileHeader}
              setData={setData}
              handleReset={handleReset}
            />
            {sections.map((value: ComponentEntity, index: number) => (
              <SectionBox
                key={index}
                isMobile={true}
                data={value}
                setData={setData}
                handleReset={handleReset}
              />
            ))}
            <MobileFooterBox
              siteId={data.id}
              data={data.mobileFooter}
              setData={setData}
              handleReset={handleReset}
            />
          </>
        ) : (
          <>
            <HeaderBox
              siteId={data.id}
              data={data.header}
              setData={setData}
              handleReset={handleReset}
            />
            {sections.map((value: ComponentEntity, index: number) => (
              <SectionBox
                key={index}
                isMobile={false}
                data={value}
                setData={setData}
                handleReset={handleReset}
              />
            ))}
            <FooterBox
              siteId={data.id}
              data={data.footer}
              setData={setData}
              handleReset={handleReset}
            />
          </>
        )}
      </S.ComponentBox>
    </S.Container>
  );
};
