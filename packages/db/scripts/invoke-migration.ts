import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";
import { Resource } from "sst";

try {
  const command = new InvokeCommand({
    FunctionName: Resource.MigrationLambda.name,
  });
  const response = await new LambdaClient().send(command);
  console.log("Response: ", new TextDecoder("utf-8").decode(response.Payload));
} catch (error) {
  console.error("Error invoking Lambda: ", error);
}
