"use client";

import type { ConfettiRef } from "@/components/magicui/confetti";
import Confetti from "@/components/magicui/confetti";
import { useRef } from "react";

export function ConfettiBasicCannon() {
  const confettiRef = useRef<ConfettiRef>(null);

  return (
      <Confetti
        ref={confettiRef}
        className="absolute left-0 top-0 z-0 h-full w-full"
      />
  );
}
