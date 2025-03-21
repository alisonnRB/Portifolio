"use client";

import { ViewProvider } from "@/scripts/viewContext";

import DragonCenarie from "@/components/dragon/dragonCenarie";
import HildaCenarie from "@/components/hilda/hildaCenarie";

export default function Home() {
  return (
    <ViewProvider>

      <div className="home overflow-x-hidden overflow-y-scroll h-[100dvh]">

        <DragonCenarie />
        <HildaCenarie />

      </div>

    </ViewProvider>
  );
}
