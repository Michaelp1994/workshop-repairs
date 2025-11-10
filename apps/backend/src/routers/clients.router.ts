import {
  archiveClientService,
  countClientsService,
  createClientService,
  getAllClientsService,
  getClientService,
  getClientsSelectService,
  updateClientService,
} from "@repo/services/services/client.service";
import {
  archiveClientSchema,
  countClientsSchema,
  createClientSchema,
  getAllClientsSchema,
  getClientBySlugSchema,
  getClientsSelectSchema,
  updateClientSchema,
} from "@repo/validators/server/clients.validators";

import { splitSlug } from "../helpers/splitUrlSlug";
import { organizationProcedure } from "../procedures";
import { router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllClientsSchema)
    .query(async ({ ctx, input }) => {
      return getAllClientsService(input, ctx.session);
    }),
  countAll: organizationProcedure
    .input(countClientsSchema)
    .query(async ({ ctx, input }) => {
      return countClientsService(input, ctx.session);
    }),
  getSelect: organizationProcedure
    .input(getClientsSelectSchema)
    .query(async ({ ctx, input }) => {
      return getClientsSelectService(input, ctx.session);
    }),
  getBySlug: organizationProcedure
    .input(getClientBySlugSchema)
    .query(async ({ ctx, input }) => {
      const { localId } = splitSlug(input.slug);

      return getClientService(localId, ctx.session);
    }),
  create: organizationProcedure
    .input(createClientSchema)
    .mutation(async ({ input, ctx }) => {
      return await createClientService(input, ctx.session);
    }),
  update: organizationProcedure
    .input(updateClientSchema)
    .mutation(async ({ input: { slug, ...values }, ctx }) => {
      const { localId } = splitSlug(slug);
      return await updateClientService(values, localId, ctx.session);
    }),
  archive: organizationProcedure
    .input(archiveClientSchema)
    .mutation(async ({ input, ctx }) => {
      const { localId } = splitSlug(input.slug);
      return archiveClientService(localId, ctx.session);
    }),
});
