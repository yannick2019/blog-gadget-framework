import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "post" model, go to https://koniya-blog.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "_sdBzOw2_oQX",
  fields: {
    body: {
      type: "string",
      default: "",
      validations: { required: true },
      storageKey: "Nedsda938dtB",
    },
    category: {
      type: "enum",
      acceptMultipleSelections: false,
      acceptUnlistedOptions: false,
      options: ["Tech", "Finance", "Sport", "Health"],
      storageKey: "SRdVQKyZvBlB",
    },
    image: {
      type: "file",
      allowPublicAccess: true,
      storageKey: "9SKjXOWOkkOm",
    },
    title: {
      type: "string",
      validations: { required: true },
      storageKey: "90T-GoQBfKS9",
    },
    user: {
      type: "belongsTo",
      parent: { model: "user" },
      storageKey: "xjxafA5gXnhl",
    },
  },
};
