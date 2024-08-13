import { signIn } from "@repo/auth";
import * as authController from "@repo/db/controllers/auth.controller";
import * as usersController from "@repo/db/controllers/users.controller";
import * as authSchemas from "@repo/validators/auth.validators";
import { TRPCError } from "@trpc/server";

import generateOTP from "../helpers/generateOTP";
import { publicProcedure, router } from "../trpc";

export default router({
  forgotPassword: publicProcedure
    .input(authSchemas.forgotPassword)
    .mutation(async ({ input, ctx }) => {
      const user = await usersController.getByEmail(input.email, ctx.db);
      if (!user) {
        return true;
      }
      const otp = generateOTP();
      console.log({ name: user.firstName, otp });
      await authController.create(
        { userId: user.id, otp, createdAt: new Date() },
        ctx.db,
      );
      return true;
    }),
  resetPassword: publicProcedure
    .input(authSchemas.resetPassword)
    .mutation(async ({ input, ctx }) => {
      const user = await usersController.getByEmail(input.email, ctx.db);
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "OTP not found",
        });
      }

      const userOtp = await authController.getById(user.id, ctx.db);

      if (!userOtp || userOtp.otp !== input.otp) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "OTP not found",
        });
      }
      signIn("credentials");

      return true;
    }),
});
