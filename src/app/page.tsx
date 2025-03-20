"use client";

import { ViewProvider } from "@/scripts/viewContext";

import DragonCenarie from "@/components/dragon/dragonCenarie";
import HildaCenarie from "@/components/hilda/hildaCenarie";

export default function Home() {
  return (
    <ViewProvider>

      <div className="home">

        <DragonCenarie />
        <HildaCenarie />

      </div>

    </ViewProvider>
  );
}
