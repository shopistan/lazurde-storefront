import axios from "axios";
import {
  OKTA_DOMAIN_PERSONAL,
  OKTA_REDIRECT_URI_PERSONAL,
  OKTA_CLIENT_ID_PERSONAL,
  OKTA_DOMAIN,
  OKTA_CLIENT_ID,
  OKTA_REDIRECT_URI,
} from "general-config";
import Router from "next/router";
import { OktaAuth } from "@okta/okta-auth-js";
import { ErrorObject } from "lib/types/common";

const GRANT_TYPE = "code";

const oktaAuth = new OktaAuth({
  issuer: OKTA_DOMAIN,
  clientId: OKTA_CLIENT_ID,
  redirectUri: OKTA_REDIRECT_URI,
});

export function validateAccess() {
  getIdToken()
    .then(function (token: any) {
      if (token) {
        console.log("Already logged in", token);
        getUserInfo();
      } else {
        oktaAuth.tokenManager.clear();
        loginOkta(GRANT_TYPE);
      }
    })
    .catch(console.error);
}

export function loginOkta(grantType: any) {
  try {
    oktaAuth.token.getWithRedirect({
      responseType: grantType,
      scopes: ["openid", "email", "profile", "offline_access"],
    });
  } catch (error) {
    console.log("Error logging in: ", error);
  }
}

export function logout() {
  getIdToken().then(function (token: any) {
    if (token) {
      var idToken = token.idToken;
      oktaAuth.tokenManager.clear();
      Router.push(
        OKTA_DOMAIN +
          "/v1/logout?client_id=" +
          OKTA_CLIENT_ID +
          "&id_token_hint=" +
          idToken +
          "&post_logout_redirect_uri=" +
          window.location.origin
      );
    } else {
      Router.push("/");
    }
  });
}

export async function callback() {
  const getTokens = async () => {
    try {
      const tokensRes = await oktaAuth.token.parseFromUrl();
      const { tokens } = tokensRes;

      if (tokens.idToken) {
        oktaAuth.tokenManager.add("id_token", tokens.idToken);
      }
      if (tokens.accessToken) {
        oktaAuth.tokenManager.add("access_token", tokens.accessToken);
      }
      if (tokens.refreshToken) {
        oktaAuth.tokenManager.add("refresh_token", tokens.refreshToken);
      }
    } catch (error) {
      console.log("Error fetching tokens", error);
    }
  };
  await getTokens();
}

export function getIdToken() {
  return oktaAuth.tokenManager.get("id_token");
}

export function getAccessToken() {
  return oktaAuth.tokenManager.get("access_token");
}

export function getRefreshToken() {
  return oktaAuth.tokenManager.get("refresh_token");
}

export const getUserInfo = async () => {
  try {
    const userRes = await axios.get(
      "https://api.identity.fabric.zone/ums/v2/users/self",
      {
        headers: {
          Authorization: `Bearer ${(await getAccessToken()).accessToken}`,
        },
      }
    );
    console.log("User Info: ", userRes);
    // const uInfo = await oktaAuth.token.getUserInfo();
    // const { name = "", email = "" } = uInfo;
    // return { name, email };
  } catch (error) {
    console.log("Error fetching user info: ", error);
  }
};
