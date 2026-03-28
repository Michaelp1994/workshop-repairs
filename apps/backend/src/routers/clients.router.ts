import ClientService from "@repo/services/services/client.service";
import {
  archiveClientSchema,
  countClientsSchema,
  createClientSchema,
  getAllClientsSchema,
  getClientByIdSchema,
  getClientsSelectSchema,
  updateClientSchema,
} from "@repo/validators/server/clients.validators";

import { splitSlug } from "../helpers/splitUrlSlug";
import { organizationProcedure } from "../procedures";
import { router } from "../trpc";

export default function clientRouter(clientService: ClientService) {
  return router({
    getAll: organizationProcedure
      .input(getAllClientsSchema)
      .query(async ({ ctx, input }) => {
        return clientService.getAllClients(input, ctx.session);
      }),
    countAll: organizationProcedure
      .input(countClientsSchema)
      .query(async ({ ctx, input }) => {
        return clientService.countClients(input, ctx.session);
      }),
    getSelect: organizationProcedure
      .input(getClientsSelectSchema)
      .query(async ({ ctx, input }) => {
        return clientService.getClientsSelect(input, ctx.session);
      }),
    getById: organizationProcedure
      .input(getClientByIdSchema)
      .query(async ({ ctx, input }) => {
        const { localId } = splitSlug(input.id);

        return clientService.getClient(localId, ctx.session);
      }),
    create: organizationProcedure
      .input(createClientSchema)
      .mutation(async ({ input, ctx }) => {
        return await clientService.createClient(input, ctx.session);
      }),
    update: organizationProcedure
      .input(updateClientSchema)
      .mutation(async ({ input: { id, ...values }, ctx }) => {
        const { localId } = splitSlug(id);
        return await clientService.updateClient(values, localId, ctx.session);
      }),
    archive: organizationProcedure
      .input(archiveClientSchema)
      .mutation(async ({ input, ctx }) => {
        const { localId } = splitSlug(input.id);
        return clientService.archiveClient(localId, ctx.session);
      }),
  });
}
