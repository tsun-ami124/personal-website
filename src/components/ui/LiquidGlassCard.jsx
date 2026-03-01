import { useState } from "react";
import { motion } from "framer-motion";

/**
 * LiquidGlassCard — adapted from liquid-weather-glass for framer-motion (JSX).
 * Render ONE <GlassFilterDef /> somewhere in your tree before using this component.
 */
export function GlassFilterDef({ id = "glass-blur" }) {
  return (
    <svg className="hidden" aria-hidden="true">
      <defs>
        <filter id={id} x="0" y="0" width="100%" height="100%" filterUnits="objectBoundingBox">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.003 0.007"
            numOctaves="1"
            result="turbulence"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="200"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}

const blurClasses = {
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-lg",
  xl: "backdrop-blur-xl",
};

const shadowStyles = {
  none: undefined,
  xs:  "inset 1px 1px 1px 0 rgba(255,255,255,0.12), inset -1px -1px 1px 0 rgba(255,255,255,0.08)",
  sm:  "inset 2px 2px 2px 0 rgba(255,255,255,0.18), inset -2px -2px 2px 0 rgba(255,255,255,0.12)",
  md:  "inset 3px 3px 3px 0 rgba(255,255,255,0.25), inset -3px -3px 3px 0 rgba(255,255,255,0.18)",
  lg:  "inset 4px 4px 4px 0 rgba(255,255,255,0.30), inset -4px -4px 4px 0 rgba(255,255,255,0.22)",
  xl:  "inset 6px 6px 6px 0 rgba(255,255,255,0.35), inset -6px -6px 6px 0 rgba(255,255,255,0.25)",
};

const glowStyles = {
  none: undefined,
  xs:  "0 4px 16px rgba(0,0,0,0.35), 0 0 16px rgba(255,255,255,0.04)",
  sm:  "0 8px 28px rgba(0,0,0,0.45), 0 0 24px rgba(255,255,255,0.06)",
  md:  "0 12px 40px rgba(0,0,0,0.55), 0 0 36px rgba(255,255,255,0.08)",
  lg:  "0 16px 56px rgba(0,0,0,0.65), 0 0 48px rgba(255,255,255,0.10)",
};

export function LiquidGlassCard({
  children,
  className = "",
  blurIntensity = "xl",
  borderRadius = "16px",
  glowIntensity = "none",
  shadowIntensity = "xs",
  animate,
  whileHover,
  whileTap,
  style,
  ...props
}) {
  const Tag = animate || whileHover || whileTap ? motion.div : "div";

  return (
    <Tag
      className={`relative ${className}`}
      style={{ borderRadius, ...style }}
      animate={animate}
      whileHover={whileHover}
      whileTap={whileTap}
      {...props}
    >
      {/* Bend layer — backdrop blur only (no SVG filter for performance) */}
      <div
        className={`absolute inset-0 ${blurClasses[blurIntensity]} z-0`}
        style={{ borderRadius }}
      />
      {/* Face layer — outer glow */}
      <div
        className="absolute inset-0 z-10"
        style={{ borderRadius, boxShadow: glowStyles[glowIntensity] }}
      />
      {/* Edge layer — inner rim highlights */}
      <div
        className="absolute inset-0 z-20"
        style={{ borderRadius, boxShadow: shadowStyles[shadowIntensity] }}
      />
      {/* Content */}
      <div className="relative z-30">{children}</div>
    </Tag>
  );
}
