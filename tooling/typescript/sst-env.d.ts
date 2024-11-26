/* This file is auto-generated by SST. Do not edit. */
/* tslint:disable */
/* eslint-disable */
/* deno-fmt-ignore-file */
import "sst"
export {}
declare module "sst" {
  export interface Resource {
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
    "MyRouter": {
      "type": "sst.aws.Router"
      "url": string
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
    "Vpc1": {
      "bastion": string
      "type": "sst.aws.Vpc"
    }
  }
}
