import UpdateRepairTypeForm from "./UpdateRepairTypeForm";

interface ViewRepairTypePageProps {
  params: {
    repairTypeId: RepairTypeID;
  };
}

export default function ViewRepairTypePage({
  params,
}: ViewRepairTypePageProps) {
  const repairTypeId = Number(params.repairTypeId);

  return (
    <div>
      <UpdateRepairTypeForm repairTypeId={repairTypeId} />
    </div>
  );
}
