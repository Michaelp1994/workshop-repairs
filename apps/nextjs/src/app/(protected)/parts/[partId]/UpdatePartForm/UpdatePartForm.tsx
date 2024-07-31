"use client";
import type { PartID } from "@repo/validators/ids.validators";

import { Button } from "@repo/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/form";
import { Input } from "@repo/ui/input";

import useUpdatePartForm from "./useUpdatePartForm";

interface UpdatePartFormProps {
  partId: PartID;
}

export default function UpdatePartForm({ partId }: UpdatePartFormProps) {
  const { isLoading, isError, deletePart, form } = useUpdatePartForm(partId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Part Details</CardTitle>
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
          <FormField
            control={form.control}
            name="partNumber"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Part Number</FormLabel>
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
          <Button type="reset">Reset</Button>
          <Button type="submit">Submit</Button>
        </CardFooter>
      </Form>
    </Card>
  );
}
