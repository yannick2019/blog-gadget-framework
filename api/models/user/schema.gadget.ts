import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "user" model, go to https://koniya-blog.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "cMHAzYvyCSEQ",
  fields: {
    email: {
      type: "email",
      validations: { required: true, unique: true },
      storageKey: "ZEHIYOonxsPo",
    },
    emailVerificationToken: {
      type: "string",
      storageKey: "wMaXOhWO2NHf",
    },
    emailVerificationTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "WHB1884chhw2",
    },
    emailVerified: {
      type: "boolean",
      default: false,
      storageKey: "TXyOwEBZM4XT",
    },
    firstName: { type: "string", storageKey: "wMpbWOpfNRt9" },
    googleImageUrl: { type: "url", storageKey: "ILBtHeFS3wj8" },
    googleProfileId: { type: "string", storageKey: "cgnIuUbdUZlF" },
    lastName: { type: "string", storageKey: "Gmq7LPeDi9sM" },
    lastSignedIn: {
      type: "dateTime",
      includeTime: true,
      storageKey: "bg731Hal36Ks",
    },
    password: {
      type: "password",
      validations: { strongPassword: true },
      storageKey: "-BUEWqncC2FO",
    },
    posts: {
      type: "hasMany",
      children: { model: "post", belongsToField: "user" },
      storageKey: "HphZhJUo3wiD",
    },
    resetPasswordToken: {
      type: "string",
      storageKey: "t9nzdHwPhc2P",
    },
    resetPasswordTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "d0TOWwj2I9nJ",
    },
    roles: {
      type: "roleList",
      default: ["unauthenticated"],
      storageKey: "FVxBv0dcxi7d",
    },
  },
};
