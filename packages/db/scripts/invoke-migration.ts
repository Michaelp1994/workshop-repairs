import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";
import { Resource } from "sst";

const client = new LambdaClient({ region: "your-region" });

const params = {
  FunctionName: Resource.MigrationLambda.name, // Name of your Lambda function
};

try {
  const command = new InvokeCommand(params);
  const response = await client.send(command);
  console.log("Response: ", new TextDecoder("utf-8").decode(response.Payload));
} catch (error) {
  console.error("Error invoking Lambda:", error);
}
