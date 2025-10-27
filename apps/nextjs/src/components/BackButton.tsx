import { Button } from "@repo/ui/button";
import { useNavigate } from "@tanstack/react-router";

interface BackButtonProps {
  children: React.ReactNode;
}

export function BackButton({ children }: BackButtonProps) {
  const navigate = useNavigate();
  return <Button onClick={() => router.back()}>{children}</Button>;
}
