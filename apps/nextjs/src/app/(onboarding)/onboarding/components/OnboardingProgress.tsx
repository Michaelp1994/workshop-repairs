"use client";
import { Progress } from "@repo/ui/progress";
import { useEffect, useState } from "react";
import { setInterval } from "timers";

export default function OnboardingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setProgress((progress) => progress + 0.1);
    }, 10);
  }, []);
  return <Progress value={progress} />;
}
