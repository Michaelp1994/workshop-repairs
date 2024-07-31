"use client";
import type { ManufacturerID } from "@repo/validators/ids.validators";
import useUpdateManufacturerForm from "./useUpdateManufacturerForm";

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

interface UpdateManufacturerFormProps {
  manufacturerId: ManufacturerID;
}

export default function UpdateManufacturerForm({
  manufacturerId,
}: UpdateManufacturerFormProps) {
  const { isLoading, isError, deleteManufacturer, form } =
    useUpdateManufacturerForm(manufacturerId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manufacturer Details</CardTitle>
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
            <>
              <Button type="reset">Reset</Button>
              <Button type="submit">Submit</Button>
            </>
          )}
        </CardFooter>
      </Form>
    </Card>
  );
}
