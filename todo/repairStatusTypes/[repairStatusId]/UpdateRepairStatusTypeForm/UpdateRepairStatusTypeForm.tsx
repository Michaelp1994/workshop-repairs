import type { RepairStatusTypeID } from "@repo/validators/ids.validators";
import useUpdateRepairStatusTypeForm from "./useUpdateRepairStatusTypeForm";
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

interface UpdateRepairStatusTypeFormProps {
  repairStatusTypeId: RepairStatusTypeID;
}

export default function UpdateRepairStatusTypeForm({
  repairStatusTypeId,
}: UpdateRepairStatusTypeFormProps) {
  const form = useUpdateRepairStatusTypeForm(repairStatusTypeId);

  if (form.query.isLoading) {
    return <div>Loading...</div>;
  }

  if (form.query.isError) {
    return <div>Error</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Repair Status Type Details</CardTitle>
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
          <Button type="reset">Reset</Button>
          <Button type="submit">Submit</Button>
        </CardFooter>
      </Form>
    </Card>
  );
}
