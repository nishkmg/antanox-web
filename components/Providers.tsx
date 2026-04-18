"use client";

import { GrainOverlay, MagneticCursor } from "@/components/effects";

export default function Providers() {
  return (
    <>
      <GrainOverlay intensity={0.03} />
      <MagneticCursor />
    </>
  );
}
