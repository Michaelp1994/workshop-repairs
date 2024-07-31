import clientsController from "@repo/db/controllers/clients.controller";
import clientSchemas from "@repo/validators/clients.validators";
import {
  getAllSchema,
  getCountSchema,
  getSelectSchema,
} from "@repo/validators/dataTables.validators";
import { TRPCError } from "@trpc/server";

import {
  createMetadata,
  deleteMetadata,
  updateMetadata,
} from "../helpers/includeMetadata";
import { protectedProcedure, router } from "../trpc";

export default router({
  getAll: protectedProcedure
    .input(getAllSchema)
    .query(async ({ ctx, input }) => {
      const allClients = await clientsController.getAll(input, ctx.db);
      return allClients;
    }),
  getCount: protectedProcedure
    .input(getCountSchema)
    .query(async ({ ctx, input }) => {
      const count = await clientsController.getCount(input, ctx.db);

      if (count === undefined) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "can't count clients",
        });
      }
      return count;
    }),
  getSelect: protectedProcedure
    .input(getSelectSchema)
    .query(async ({ ctx, input }) => {
      const allClients = await clientsController.getSelect(input, ctx.db);

      return allClients;
    }),
  getById: protectedProcedure
    .input(clientSchemas.getById)
    .query(async ({ input, ctx }) => {
      const client = await clientsController.getById(input.id, ctx.db);

      if (!client) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "client not found",
        });
      }

      return client;
    }),
  create: protectedProcedure
    .input(clientSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const metadata = createMetadata(ctx.session);
      const createdClient = await clientsController.create(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!createdClient) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't create client",
        });
      }

      return createdClient;
    }),
  update: protectedProcedure
    .input(clientSchemas.update)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);
      const updatedClient = await clientsController.update(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!updatedClient) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't update client",
        });
      }

      return updatedClient;
    }),
  delete: protectedProcedure
    .input(clientSchemas.delete)
    .mutation(async ({ input, ctx }) => {
      const metadata = deleteMetadata(ctx.session);
      const deletedClient = await clientsController.delete(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!deletedClient) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't delete client",
        });
      }

      return deletedClient;
    }),
});
