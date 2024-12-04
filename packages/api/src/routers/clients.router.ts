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
  archiveClientSchema,
  countClientsSchema,
  createClientSchema,
  getAllClientsSchema,
  getClientByIdSchema,
  getClientsSelectSchema,
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
    .meta({ action: "read", entity: "clients" })
    .input(getAllClientsSchema)
    .query(async ({ ctx, input }) => {
      const allClients = await getAllClients(input, ctx.session.organizationId);
      return allClients;
    }),
  countAll: organizationProcedure
    .meta({ action: "read", entity: "clients" })
    .input(countClientsSchema)
    .query(async ({ ctx, input }) => {
      const count = await countClients(input, ctx.session.organizationId);
      assertDatabaseResult(count);
      return count;
    }),
  getSelect: organizationProcedure
    .meta({ action: "read", entity: "clients" })
    .input(getClientsSelectSchema)
    .query(async ({ ctx, input }) => {
      const allClients = await getClientsSelect(
        input,
        ctx.session.organizationId,
      );

      return allClients;
    }),
  getById: organizationProcedure
    .meta({ action: "read", entity: "clients" })
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
    .meta({ action: "create", entity: "clients" })
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
    .meta({ action: "update", entity: "clients" })
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
    .meta({ action: "delete", entity: "clients" })
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
