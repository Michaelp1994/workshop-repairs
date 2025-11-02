import {
  archiveClient,
  countClients,
  createClient,
  getAllClients,
  getClientByLocalId,
  getClientsSelect,
  updateClient,
} from "@repo/db/repositories/client.repository";
import { getSequenceByOrganizationId } from "@repo/db/repositories/organizationSequence.repository";
import {
  archiveClientSchema,
  countClientsSchema,
  createClientSchema,
  getAllClientsSchema,
  getClientBySlugSchema,
  getClientsSelectSchema,
  updateClientSchema,
} from "@repo/validators/server/clients.validators";
import { TRPCError } from "@trpc/server";

import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
} from "../helpers/includeMetadata";
import { createSlug, splitSlug } from "../helpers/splitUrlSlug";
import assertDatabaseResult from "../helpers/trpcAssert";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllClientsSchema)
    .query(async ({ ctx, input }) => {
      const allClients = await getAllClients(input, ctx.session.organizationId);

      const sequences = await getSequenceByOrganizationId(
        ctx.session.organizationId,
      );

      if (!sequences) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "can't find client",
        });
      }

      const prefix = sequences.clientKeyPrefix;

      return allClients.map((client) => ({
        ...client,
        slug: createSlug(prefix, client.localId),
      }));
    }),
  countAll: organizationProcedure
    .input(countClientsSchema)
    .query(async ({ ctx, input }) => {
      const count = await countClients(input, ctx.session.organizationId);
      assertDatabaseResult(count);
      return count;
    }),
  getSelect: organizationProcedure
    .input(getClientsSelectSchema)
    .query(async ({ ctx, input }) => {
      const allClients = await getClientsSelect(
        input,
        ctx.session.organizationId,
      );

      return allClients;
    }),
  getBySlug: organizationProcedure
    .input(getClientBySlugSchema)
    .query(async ({ ctx, input }) => {
      const { localId } = splitSlug(input.slug);

      const client = await getClientByLocalId(
        localId,
        ctx.session.organizationId,
      );

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
      const createMetadata = createInsertMetadata(ctx.session);

      const createdClient = await createClient({
        organizationId: ctx.session.organizationId,
        ...input,
        ...createMetadata,
      });

      assertDatabaseResult(createdClient);

      return createdClient;
    }),
  update: organizationProcedure
    .input(updateClientSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createUpdateMetadata(ctx.session);
      const { localId } = splitSlug(input.slug);
      const updatedClient = await updateClient(
        {
          localId,
          ...input,
          ...metadata,
        },
        ctx.session.organizationId,
      );

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
