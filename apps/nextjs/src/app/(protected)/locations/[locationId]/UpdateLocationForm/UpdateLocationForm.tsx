"use client";
import type { LocationID } from "@repo/validators/ids.validators";

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

import useUpdateLocationForm from "./useUpdateLocationForm";

interface UpdateLocationFormProps {
  locationId: LocationID;
}

export default function UpdateLocationForm({
  locationId,
}: UpdateLocationFormProps) {
  const { form, isLoading, isError, deleteLocation } =
    useUpdateLocationForm(locationId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Location Details</CardTitle>
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
            name="address"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Address</FormLabel>
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
