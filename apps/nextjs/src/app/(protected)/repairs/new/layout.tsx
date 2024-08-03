import { BackButton } from "~/components/BackButton";
import { DetailsPage, DetailsPageToolbar } from "~/components/DetailsPage";

interface CreateRepairLayoutProps {
  children: React.ReactNode;
}

export default function CreateRepairLayout({
  children,
}: CreateRepairLayoutProps) {
  return (
    <DetailsPage>
      <DetailsPageToolbar>
        <BackButton />
      </DetailsPageToolbar>
      {children}
    </DetailsPage>
  );
}
