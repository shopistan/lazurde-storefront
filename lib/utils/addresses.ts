import Axios from "axios";
import ENDPOINTS from "lib/api/endpoints";
import HEADERS from "lib/api/headers";
import { ErrorObject } from "lib/types/common";
import { OMS_DOMAIN, WISHLIST } from "general-config";

export const getAllAddresses = async (authToken?: string) => {
  authToken =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNWRiMjliMGM0NjQ4MDM2YTI0NWZjMCIsInJvbGVzIjpbeyJpZCI6IjVlMTk2MjUwNWVmNjEyMDAwODlmM2IyMiJ9XSwicGVybWlzc2lvbnMiOltdLCJhY2NvdW50aWQiOiI2MjVkYjI5YWRlZTBlMjAwMDliMmRhNGQiLCJhY2NvdW50SWQiOm51bGwsInVzZXJUeXBlIjp7ImtpbmQiOiJSRUdJU1RFUkVEIn0sInRlbmFudElkIjoiNjFhNTEwZmEzN2JiNjQwMDA5YWNmNTVlIiwiaXNzdWVyIjoiNTczNzg1OTIzMjI0IiwiaWF0IjoxNjU2NTg4NzE4LCJleHAiOjE2NTY1OTA1MTh9.PctwBFtstpaPgPHSpfe3SACKRX78woXayTKASfA0HVXPEhreuTiH2lxT-DhOXJSHa4WgvpFvYn8JEta3aGp9pYWn9QNk3hSEimrO04F78lvj9yWtmyi2RYrBf8IUNlaIE8OXAfxM4iDUt-0dptmbVdkKdcCyX07umAIgOYbC_a4";
  try {
    const response = await Axios.get(
      `https://sandbox.copilot.fabric.inc/data-customer/v1/addresses`,
      {
        headers: { ...HEADERS.common, Authorization: authToken },
      }
    );
    return response;
  } catch (error: unknown) {
    console.log(
      "Error while fecthing reviews",
      (error as ErrorObject)?.message
    );
  }
};

export const getInventoryAuth = async () => {
  try {
    const response = await Axios.post(
      `${WISHLIST}${ENDPOINTS.INVENTORY.GET_AUTH}`,
      {
        username: "test@fabric.inc",
        password: "test1234",
      },
      {
        headers: { ...HEADERS.common },
      }
    );
    return response;
  } catch (error: unknown) {
    console.log(
      "Error while fecthing reviews",
      (error as ErrorObject)?.message
    );
  }
};
