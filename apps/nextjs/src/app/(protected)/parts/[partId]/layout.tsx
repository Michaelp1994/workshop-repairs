import { BackButton } from "~/components/BackButton";
import {
  DetailsPage,
  DetailsPageTitle,
  DetailsPageToolbar,
} from "~/components/DetailsPage";

interface ViewPartLayout {
  children: React.ReactNode;
  params: {
    partId: string;
  };
}

export default function ViewPartLayout({ children, params }: ViewPartLayout) {
  const partId = Number(params.partId);

  return (
    <DetailsPage>
      <DetailsPageToolbar>
        <BackButton />
        <DetailsPageTitle>Part #{partId}</DetailsPageTitle>
      </DetailsPageToolbar>
      {children}
    </DetailsPage>
  );
}
