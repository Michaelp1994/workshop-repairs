/* This file is auto-generated by SST. Do not edit. */
/* tslint:disable */
/* eslint-disable */
/* deno-fmt-ignore-file */
import "sst"
export {}
declare module "sst" {
  export interface Resource {
    "API1": {
      "type": "sst.aws.ApiGatewayV2"
      "url": string
    }
    "Bucket1": {
      "name": string
      "type": "sst.aws.Bucket"
    }
    "Email1": {
      "configSet": string
      "sender": string
      "type": "sst.aws.Email"
    }
    "JWT_SECRET": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "MyWeb": {
      "type": "sst.aws.Nextjs"
      "url": string
    }
    "Postgres1": {
      "database": string
      "host": string
      "password": string
      "port": number
      "type": "sst.sst.Linkable"
      "username": string
    }
  }
}
