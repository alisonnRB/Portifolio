"use client";

import { ViewProvider } from "@/scripts/viewContext";

import DragonCenarie from "@/components/dragon/dragonCenarie";
import HildaCenarie from "@/components/hilda/hildaCenarie";
import MyWork from "@/components/myWorks/myWork";
import Game from "@/components/game/game";

export default function Home() {
  return (
    <ViewProvider>

      <div className="home overflow-x-hidden overflow-y-scroll h-[100dvh]">

        <DragonCenarie />
        <HildaCenarie />
        <MyWork />
        <Game />

      </div>

    </ViewProvider>
  );
}
