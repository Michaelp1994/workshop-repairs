import { DetailsLabel, DetailsValue } from "@repo/ui/details-list";

import { formatDate } from "~/utils/formatDate";

interface MetadataFieldsProps {
  metadata: {
    createdAt: string;
    createdBy: {
      firstName: string;
      lastName: string;
    } | null;
    updatedAt: string | null;
    updatedBy: {
      firstName: string;
      lastName: string;
    } | null;
    deletedAt: string | null;
    deletedBy: {
      firstName: string;
      lastName: string;
    } | null;
  };
}

export default function MetadataFields({ metadata }: MetadataFieldsProps) {
  return (
    <>
      <DetailsLabel>Created On:</DetailsLabel>
      <DetailsValue>{formatDate(metadata.createdAt)}</DetailsValue>
      {metadata.createdBy && (
        <>
          <DetailsLabel>Created By:</DetailsLabel>
          <DetailsValue>
            {metadata.createdBy.firstName} {metadata.createdBy.lastName}
          </DetailsValue>
        </>
      )}
      {metadata.updatedBy && (
        <>
          <DetailsLabel>Last Updated On:</DetailsLabel>
          <DetailsValue>{formatDate(metadata.updatedAt)}</DetailsValue>
          <DetailsLabel>Last Updated By:</DetailsLabel>
          <DetailsValue>
            {metadata.updatedBy.firstName} {metadata.updatedBy.lastName}
          </DetailsValue>
        </>
      )}
      {metadata.deletedBy && (
        <>
          <DetailsLabel>Deleted On:</DetailsLabel>
          <DetailsValue>{formatDate(metadata.deletedAt)}</DetailsValue>
          <DetailsLabel>Deleted By:</DetailsLabel>
          <DetailsValue>
            {metadata.deletedBy.firstName} {metadata.deletedBy.lastName}
          </DetailsValue>
        </>
      )}
    </>
  );
}
