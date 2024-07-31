import UpdateClientForm from "./UpdateClientForm";

interface ViewClientPageProps {
  params: {
    clientId: string;
  };
}

export default function ViewClientPage({ params }: ViewClientPageProps) {
  const clientId = Number(params.clientId);
  return (
    <div>
      <div>
        <div>
          <UpdateClientForm clientId={clientId} />
        </div>
        <div>{/* <AssetsTable clientId={clientId} /> */}</div>
      </div>
    </div>
  );
}
