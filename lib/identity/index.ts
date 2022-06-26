import axios from "axios";
import { OKTA_DOMAIN, OKTA_CLIENT_ID, UMS_IDENTITY_URL } from "general-config";
import Router from "next/router";
import { AuthTokens } from "lib/types/common";
import ENDPOINTS from "lib/api/endpoints";

export const codeVerifier =
  "M25iVXpKU3puUjFaYWg3T1NDTDQtcW1ROUY5YXlwalNoc0hhakxifmZHag";
export const codeChallenge = "qjrzSW9gMiUgpUvqgEPE4_-8swvyCtfOVvg55o5S_es";
export const state = "state-8600b31f-52d1-4dca-987c-386e3d8967e9";

const getRedirectUri = () => {
  // if (process.env.NODE_ENV === "production") {
  //   if (typeof window !== "undefined") {
  //     if (window?.location?.hostname?.includes("dev")) {
  //       return OKTA_REDIRECT_URI_DEV;
  //     } else if (window?.location?.hostname?.includes("qa")) {
  //       return OKTA_REDIRECT_URI_QA;
  //     } else if (window?.location?.hostname?.includes("uat")) {
  //       return OKTA_REDIRECT_URI_UAT;
  //     }
  //   }
  // }
  // return OKTA_REDIRECT_URI_LOCAL;

  if (typeof window !== "undefined") {
    return `${window.location.origin}/auth/callback`;
  }
};

const getPostLogoutRedirect = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
};

export const loginUser = () => {
  const authTokens = JSON.parse(window.localStorage.getItem("auth_tokens"));
  if (authTokens) {
    console.log("Already logged in: ", authTokens);
  } else {
    Router.push(
      `${OKTA_DOMAIN}/v1/authorize?client_id=${OKTA_CLIENT_ID}&code_challenge=${codeChallenge}&code_challenge_method=S256&redirect_uri=${getRedirectUri()}&response_type=code&state=${state}&scope=openid%20email%20profile%20offline_access`
    );
  }
};

export const fetchTokens = async (code: string) => {
  try {
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("redirect_uri", getRedirectUri());
    params.append("client_id", OKTA_CLIENT_ID);
    params.append("code", code);
    params.append("code_verifier", codeVerifier);
    const tokensRes = await axios.post(`${OKTA_DOMAIN}/v1/token`, params, {
      headers: {
        accept: "application/json",
        "content-type": "application/x-www-form-urlencoded",
      },
    });
    if (tokensRes && tokensRes.data) {
      if (tokensRes.data.access_token) {
        window.localStorage.setItem(
          "auth_tokens",
          JSON.stringify(tokensRes.data)
        );
      }
    }
  } catch (error) {
    console.log("Error fetching tokens: ", error);
  }
};

export const logoutUser = async () => {
  try {
    const authTokens: AuthTokens = JSON.parse(
      window.localStorage.getItem("auth_tokens")
    );
    if (authTokens && authTokens.id_token) {
      Router.push(
        `${OKTA_DOMAIN}/v1/logout?id_token_hint=${
          authTokens.id_token
        }&post_logout_redirect_uri=${getPostLogoutRedirect()}&state=${state}`
      );
    }
    window.localStorage.removeItem("auth_tokens");
  } catch (error) {
    console.log("Error logging out: ", error);
  }
};

export const getUserInfo = async () => {
  try {
    const authTokens = JSON.parse(window.localStorage.getItem("auth_tokens"));
    const { access_token = "" } = authTokens;

    const userInfoRes = await axios.get(
      `${UMS_IDENTITY_URL}${ENDPOINTS.IDENTITY.GET_USER_INFO}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return userInfoRes.data;
  } catch (error) {
    console.log("Error fetching user info: ", error);
  }
};

export const resetUserPassword = async (
  oldPassword: string,
  newPassword: string
) => {
  try {
    const authTokens = JSON.parse(window.localStorage.getItem("auth_tokens"));
    const { access_token = "" } = authTokens;

    const resetPasswordRes = await axios.post(
      `${UMS_IDENTITY_URL}${ENDPOINTS.IDENTITY.RESET_PASSWORD}`,
      {
        oldPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log("reset pw res", resetPasswordRes);
  } catch (error) {
    console.log("Error fetching user info: ", error);
  }
};

export const refreshAuthToken = async () => {
  try {
    const authTokens = JSON.parse(window.localStorage.getItem("auth_tokens"));
    const { refresh_token = "" } = authTokens;

    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("redirect_uri", getRedirectUri());
    params.append("client_id", OKTA_CLIENT_ID);
    params.append("refresh_token", refresh_token);
    params.append("scope", "openid offline_access profile email");

    const tokensRes = await axios.post(`${OKTA_DOMAIN}/v1/token`, params, {
      headers: {
        accept: "application/json",
        "content-type": "application/x-www-form-urlencoded",
      },
    });
    if (tokensRes && tokensRes.data) {
      if (tokensRes.data.access_token) {
        window.localStorage.setItem(
          "auth_tokens",
          JSON.stringify(tokensRes.data)
        );
      }
    }
  } catch (error) {
    console.log("Error refreshing access token: ", error);
  }
};
