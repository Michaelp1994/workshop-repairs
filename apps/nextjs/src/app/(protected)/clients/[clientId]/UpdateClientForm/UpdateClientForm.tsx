"use client";
import type { ClientID } from "@repo/validators/ids.validators";
import { useUpdateClientForm } from "./useUpdateClientForm";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@repo/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";

interface BaseFormProps {
  clientId: ClientID;
}

export default function UpdateClientForm({ clientId }: BaseFormProps) {
  const {
    isLoading,
    data: client,
    isError,
    deleteClient,
    form,
  } = useUpdateClientForm(clientId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !client) {
    return <div>Error</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Details</CardTitle>
      </CardHeader>
      <Form {...form}>
        <CardContent>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </CardContent>
        <CardFooter>
          {form.enabled && (
            <div>
              <Button type="reset">Reset</Button>
              <Button type="submit">Submit</Button>
            </div>
          )}
        </CardFooter>
      </Form>
    </Card>
  );
}
