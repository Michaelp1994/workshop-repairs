import UpdateRepairStatusTypeForm from "./UpdateRepairStatusTypeForm";

interface ViewRepairStatusTypePageProps {
  params: {
    repairStatusTypeId: RepairStatusTypeID;
  };
}

export default function ViewRepairStatusTypePage({
  params,
}: ViewRepairStatusTypePageProps) {
  const repairStatusTypeId = Number(params.repairStatusTypeId);

  return (
    <div>
      <div>
        <div>
          <UpdateRepairStatusTypeForm repairStatusTypeId={repairStatusTypeId} />
        </div>
      </div>
    </div>
  );
}
