import { Client } from "@gadget-client/koniya-blog";

export const api = new Client({ environment: window.gadgetConfig.environment });
