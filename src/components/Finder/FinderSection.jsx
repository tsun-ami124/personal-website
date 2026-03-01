import { useState } from "react";
import { GlassFilterDef, LiquidGlassCard } from "../ui/LiquidGlassCard.jsx";
import { FinderSidebar } from "./FinderSidebar.jsx";
import { FinderContent } from "./FinderContent.jsx";
import { FinderInfoPanel } from "./FinderInfoPanel.jsx";
import { ContainerScroll } from "../shared/ContainerScroll.jsx";

export function FinderSection() {
  const [activeSidebar, setActiveSidebar] = useState("home");
  const [activeTab, setActiveTab] = useState("home");

  return (
    <section
      id="finder"
      className="relative min-h-screen px-4 py-20 md:px-10 lg:px-20 flex items-center overflow-hidden"
    >
      <ContainerScroll>
        {/* GlassFilterDef for backdrop filter */}
        <GlassFilterDef id="glass-blur" />

        {/* Liquid glass window - centered and styled for visibility */}
        <div
          className="glass-finder-window h-full w-full border border-white/10 overflow-hidden"
          style={{ borderRadius: "12px" }}
        >
          {/* Title bar */}
          <div
            className="glass-panel flex items-center justify-center border-b border-white/[0.07] px-4 py-2"
            style={{ borderRadius: "12px 12px 0 0" }}
          >
            <div className="text-xs font-mono text-gray-300">
              Ivan&apos;s Portfolio
            </div>
          </div>

          {/* 3-column body */}
          <div className="grid h-[480px] md:h-[520px] grid-cols-[minmax(140px,0.25fr)_minmax(0,1.3fr)_minmax(180px,0.5fr)]">
            <FinderSidebar active={activeSidebar} onChange={setActiveSidebar} className="glass-panel-dark" />
            <FinderContent
              activeSidebar={activeSidebar}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              className="glass-panel"
            />
            <FinderInfoPanel className="glass-panel-dark" />
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
