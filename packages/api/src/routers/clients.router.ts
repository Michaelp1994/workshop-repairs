import * as clientsController from "@repo/db/controllers/clients.controller";
import * as clientSchemas from "@repo/validators/clients.validators";
import {
  getAllSchema,
  getCountSchema,
  getSelectSchema,
} from "@repo/validators/dataTables.validators";
import { TRPCError } from "@trpc/server";

import {
  archiveMetadata,
  createMetadata,
  updateMetadata,
} from "../helpers/includeMetadata";
import assertDatabaseResult from "../helpers/trpcAssert";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllSchema)
    .query(async ({ ctx, input }) => {
      const allClients = await clientsController.getAll(
        input,
        ctx.session.organizationId,
      );
      return allClients;
    }),
  getCount: organizationProcedure
    .input(getCountSchema)
    .query(async ({ ctx, input }) => {
      const count = await clientsController.getCount(
        input,
        ctx.session.organizationId,
      );
      assertDatabaseResult(count);
      return count;
    }),
  getSelect: organizationProcedure
    .input(getSelectSchema)
    .query(async ({ ctx, input }) => {
      const allClients = await clientsController.getSelect(
        input,
        ctx.session.organizationId,
      );

      return allClients;
    }),
  getById: organizationProcedure
    .input(clientSchemas.getById)
    .query(async ({ input }) => {
      const client = await clientsController.getById(input.id);
      if (!client) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "can't find client",
        });
      }
      return client;
    }),
  create: organizationProcedure
    .input(clientSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const metadata = createMetadata(ctx.session);
      const createdClient = await clientsController.create({
        ...input,
        organizationId: ctx.session.organizationId,
        ...metadata,
      });

      assertDatabaseResult(createdClient);

      return createdClient;
    }),
  update: organizationProcedure
    .input(clientSchemas.update)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);
      const updatedClient = await clientsController.update({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(updatedClient);
      return updatedClient;
    }),
  archive: organizationProcedure
    .input(clientSchemas.archive)
    .mutation(async ({ input, ctx }) => {
      const metadata = archiveMetadata(ctx.session);
      const archivedClient = await clientsController.archive({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(archivedClient);

      return archivedClient;
    }),
});
