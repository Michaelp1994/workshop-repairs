"use client";
import { Button } from "@repo/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import Link from "next/link";

interface ArchiveSectionProps {
  title: string;
  description: string;
  onArchive?: () => void;
  href: string;
}

export default function ArchiveSection({
  href,
  title,
  description,
}: ArchiveSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild variant="destructive">
          <Link href={href}>Archive</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
