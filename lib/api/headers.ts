import {
  ACCOUNT,
  CHANNEL,
  STAGE,
  STAMPED_USERNAME,
  STAMPED_PASSWORD,
} from "general-config";

const token = `${STAMPED_USERNAME}:${STAMPED_PASSWORD}`;
const HEADERS = {
  common: {
    "Content-Type": "application/json",
    "x-site-context": JSON.stringify({
      account: ACCOUNT,
      stage: STAGE,
      channel: CHANNEL,
      date: new Date().toISOString(),
    }),
  },

  reviews: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${Buffer.from(token)?.toString("base64")}`,
  },
};

export default HEADERS;
