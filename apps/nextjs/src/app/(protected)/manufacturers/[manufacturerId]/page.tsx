import UpdateManufacturerForm from "../_components/UpdateManufacturerForm";

// import ModelsTable from "~/features/models/components/ModelsTable";

interface ViewManufacturerPageProps {
  params: {
    manufacturerId: ManufacturerID;
  };
}

export default function ViewManufacturerPage({
  params,
}: ViewManufacturerPageProps) {
  const manufacturerId = Number(params.manufacturerId);

  return (
    <div>
      <div>
        <div>
          <UpdateManufacturerForm manufacturerId={manufacturerId} />
        </div>
        <div>{/* <ModelsTable manufacturerId={manufacturerId} /> */}</div>
      </div>
    </div>
  );
}
