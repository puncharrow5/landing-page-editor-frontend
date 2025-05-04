"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SiteEntity, useFindOneSiteByIdQuery } from "@/graphql/generated/types";
import { Container } from "@/components/Container";
import { SidePanel } from "@/components/SidePanel";
import { MobileContainer } from "@/components/MobileContainer";

export default function Edit() {
  const router = useRouter();

  const [isMoblie, setIsMobile] = useState<boolean>(false);
  const [siteData, setSiteData] = useState<SiteEntity>();

  const { data, refetch } = useFindOneSiteByIdQuery({
    variables: {
      id: Number(router.query.siteId),
    },
    onCompleted: (data) => {
      setSiteData(data.findOneSiteById);
    },
    fetchPolicy: "network-only",
  });

  const handleSetDesktop = () => {
    setIsMobile(false);
  };

  const handleSetMobile = () => {
    setIsMobile(true);
  };

  const handleReset = () => {
    setSiteData(data?.findOneSiteById);
  };

  useEffect(() => {
    setSiteData(data?.findOneSiteById);
  }, [data?.findOneSiteById]);

  return (
    <>
      {isMoblie ? <MobileContainer data={siteData} /> : <Container data={siteData} />}
      <SidePanel
        isMobile={isMoblie}
        data={data?.findOneSiteById}
        setData={setSiteData}
        handleReset={handleReset}
        handleSetDesktop={handleSetDesktop}
        handleSetMobile={handleSetMobile}
      />
    </>
  );
}
