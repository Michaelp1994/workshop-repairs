"use client";
import type { PartID } from "@repo/validators/ids.validators";

import {
  Form,
  FormControl,
  FormField,
  FormFooter,
  FormItem,
  FormLabel,
  FormMessage,
  ResetButton,
  SubmitButton,
} from "@repo/ui/form";
import { useForm } from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import { toast } from "@repo/ui/sonner";
import {
  UserFormInput,
  userFormSchema,
} from "@repo/validators/forms/users.schema";
import { useRouter } from "next/navigation";

import UserTypeSelect from "~/components/selects/UserTypeSelect";
import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

interface UpdateUserFormProps {
  userId: PartID;
}

export default function UpdateUserForm({ userId }: UpdateUserFormProps) {
  const router = useRouter();
  const utils = api.useUtils();
  const [user] = api.users.getById.useSuspenseQuery({
    id: userId,
  });

  const updateMutation = api.users.update.useMutation({
    async onSuccess(values) {
      await utils.users.getById.invalidate({ id: values.id });
      toast.success(`User ${values.firstName} updated`);
      router.push(`/users/${values.id}`);
    },
    onError(errors) {
      displayMutationErrors(errors, form);
    },
  });

  const form = useForm({
    values: user,
    schema: userFormSchema,
  });

  function handleValid(values: UserFormInput) {
    updateMutation.mutate({ ...values, id: userId });
  }

  return (
    <Form {...form}>
      <form onSubmit={(e) => void form.handleSubmit(handleValid)(e)}>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="typeId"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>User Type</FormLabel>
                <FormControl>
                  <UserTypeSelect {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormFooter>
          <ResetButton />
          <SubmitButton />
        </FormFooter>
      </form>
    </Form>
  );
}
