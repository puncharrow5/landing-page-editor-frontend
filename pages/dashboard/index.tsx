import React from "react";
import { SiteList } from "@/components/SiteList";
import { AdminInfo } from "@/components/AdminInfo";

export default function Dashboard() {
  return (
    <div className="flex justify-center w-screen h-screen px-[120px] py-[120px] ">
      <div className="flex w-full max-w-[1280px] justify-center gap-[40px]">
        <AdminInfo />
        <SiteList />
      </div>
    </div>
  );
}
