import Axios from "axios";
import { API_DOMAIN } from "general-config";
import ENDPOINTS from "lib/api/endpoints";
import HEADERS from "lib/api/headers";
import { ErrorObject } from "lib/types/common";

export const fetchXMComponents = async (
  channel: number,
  pageUrl: string = "/"
) => {
  try {
    const response = await Axios.get(
      `${API_DOMAIN}${ENDPOINTS.XM.FETCH_PAGE_BY_URL(channel, pageUrl)}`,
      {
        headers: HEADERS.common,
      }
    );
    return response.data?.data?.version[0]?.components ?? null;
  } catch (error: any) {
    console.log(
      `Error fetching components for ${pageUrl}: `,
      (error as ErrorObject).message
    );
  }
  return null;
};

export const fetchGlobalComponents = async (): Promise<any> => {
  console.log(`GC URL: ${API_DOMAIN}${ENDPOINTS.XM.FETCH_GLOBAL_COMPONENTS}`);
  try {
    const response = await Axios.get(
      `${API_DOMAIN}${ENDPOINTS.XM.FETCH_GLOBAL_COMPONENTS}`,
      {
        headers: HEADERS.common,
      }
    );
    console.log("Global Components: ", response.data);
    return response.data;
  } catch (error: any) {
    console.log(
      `Error fetching global components: `,
      (error as ErrorObject).message
    );
  }
  return null;
};
