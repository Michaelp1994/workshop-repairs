import {
  archiveClient,
  countClients,
  createClient,
  getAllClients,
  getClientById,
  getClientsSelect,
  updateClient,
} from "@repo/db/repositories/client.repository";
import {
  dataTableCountSchema,
  dataTableSchema,
  getSelectSchema,
} from "@repo/validators/dataTables.validators";
import {
  archiveClientSchema,
  createClientSchema,
  getClientByIdSchema,
  updateClientSchema,
} from "@repo/validators/server/clients.validators";
import { TRPCError } from "@trpc/server";

import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
} from "../helpers/includeMetadata";
import assertDatabaseResult from "../helpers/trpcAssert";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(dataTableSchema)
    .query(async ({ ctx, input }) => {
      const allClients = await getAllClients(input, ctx.session.organizationId);
      return allClients;
    }),
  countAll: organizationProcedure
    .input(dataTableCountSchema)
    .query(async ({ ctx, input }) => {
      const count = await countClients(input, ctx.session.organizationId);
      assertDatabaseResult(count);
      return count;
    }),
  getSelect: organizationProcedure
    .input(getSelectSchema)
    .query(async ({ ctx, input }) => {
      const allClients = await getClientsSelect(
        input,
        ctx.session.organizationId,
      );

      return allClients;
    }),
  getById: organizationProcedure
    .input(getClientByIdSchema)
    .query(async ({ input }) => {
      const client = await getClientById(input.id);
      if (!client) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "can't find client",
        });
      }
      return client;
    }),
  create: organizationProcedure
    .input(createClientSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createInsertMetadata(ctx.session);
      const createdClient = await createClient({
        ...input,
        organizationId: ctx.session.organizationId,
        ...metadata,
      });

      assertDatabaseResult(createdClient);

      return createdClient;
    }),
  update: organizationProcedure
    .input(updateClientSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createUpdateMetadata(ctx.session);
      const updatedClient = await updateClient({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(updatedClient);
      return updatedClient;
    }),
  archive: organizationProcedure
    .input(archiveClientSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createArchiveMetadata(ctx.session);
      const archivedClient = await archiveClient({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(archivedClient);

      return archivedClient;
    }),
});
