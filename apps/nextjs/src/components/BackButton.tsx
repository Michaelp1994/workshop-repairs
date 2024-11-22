"use client";
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  children: React.ReactNode;
}

export function BackButton({ children }: BackButtonProps) {
  const router = useRouter();
  return <Button onClick={() => router.back()}>{children}</Button>;
}
