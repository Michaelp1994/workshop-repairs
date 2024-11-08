import { APIGatewayProxyHandler } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (req) => {
  return {
    statusCode: 204,
    body: "{}",
    headers: {
      "Access-Control-Allow-Origin": "https://localhost:3000", // Replace with your allowed origin(s)
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization", // Specify the headers you're allowing
      "Access-Control-Allow-Credentials": "true", // N
    },
  };
};
