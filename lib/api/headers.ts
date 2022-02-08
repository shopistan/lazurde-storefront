import { ACCOUNT, CHANNEL, STAGE } from "general-config";

export const HEADERS = {
  common: {
    "Content-Type": "application/json",
    "x-site-context": JSON.stringify({
      account: ACCOUNT,
      stage: STAGE,
      channel: CHANNEL,
      date: new Date().toISOString(),
    }),
  },
};
