import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/form";
import type { RepairTypeID } from "@repo/validators/ids.validators";
import useUpdateRepairTypeForm from "./useUpdateRepairTypeForm";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@repo/ui/card";
import { Input } from "@repo/ui/input";

interface UpdateRepairTypeFormProps {
  repairTypeId: RepairTypeID;
}

export default function UpdateRepairTypeForm({
  repairTypeId,
}: UpdateRepairTypeFormProps) {
  const form = useUpdateRepairTypeForm(repairTypeId);

  if (form.query.isLoading) {
    return <div>Loading...</div>;
  }

  if (form.query.isError) {
    return <div>Error</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Repair Type Details</CardTitle>
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
          <CardFooterActions>
            <Button type="reset">Reset</Button>
            <Button type="submit">Submit</Button>
          </CardFooterActions>
        </CardFooter>
      </Form>
    </Card>
  );
}
