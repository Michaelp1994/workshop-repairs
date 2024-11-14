import { BackButton } from "~/components/BackButton";
import {
  DetailsPage,
  DetailsPageTitle,
  DetailsPageToolbar,
} from "~/components/DetailsPage";

interface ClientLayoutProps {
  children: React.ReactNode;
  params: {
    clientId: string;
  };
}

export default function ClientLayout({ children, params }: ClientLayoutProps) {
  const clientId = Number(params.clientId);
  return (
    <DetailsPage>
      <DetailsPageToolbar>
        <BackButton />
        <DetailsPageTitle>Client #{clientId}</DetailsPageTitle>
      </DetailsPageToolbar>
      {children}
    </DetailsPage>
  );
}
