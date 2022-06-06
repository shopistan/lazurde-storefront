import axios from "axios";
import {
  OKTA_DOMAIN_PERSONAL,
  OKTA_REDIRECT_URI_PERSONAL,
  OKTA_CLIENT_ID_PERSONAL,
} from "general-config";
import Router from "next/router";
import { OktaAuth } from "@okta/okta-auth-js";

const ISSUER = "https://dev-92452513.okta.com/oauth2/default";
const CLIENT_ID = "0oa4gxm0iruNhUUeW5d7";
const REDIRECT_URL = "http://localhost:8080" + "/authorization-code/callback";
const GRANT_TYPE = "code";

const oktaAuth = new OktaAuth({
  issuer: OKTA_DOMAIN_PERSONAL,
  clientId: OKTA_CLIENT_ID_PERSONAL,
  redirectUri: OKTA_REDIRECT_URI_PERSONAL,
});

export function validateAccess() {
  getIdToken()
    .then(function (token: any) {
      if (token) {
        //next();
        console.log("Already logged in", token);
      } else {
        oktaAuth.tokenManager.clear();
        loginOkta(GRANT_TYPE);
      }
    })
    .catch(console.error);
}

export function loginOkta(grantType: any) {
  // oktaAuth.options.grantType = grantType;
  oktaAuth.token.getWithRedirect({
    responseType: grantType,
    scopes: ["openid", "profile", "email"],
  });
}

export function logout() {

  getIdToken().then(function (token: any) {
    if (token) {
      var idToken = token.idToken;
      oktaAuth.tokenManager.clear();
      Router.push(
        OKTA_DOMAIN_PERSONAL +
          "/v1/logout?client_id=" +
          OKTA_CLIENT_ID_PERSONAL +
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

export function callback() {
  // detect code
  var grantType = GRANT_TYPE;
  oktaAuth.token
    .parseFromUrl()
    .then((tokensRes: any) => {
      console.log("tokens are", tokensRes);
      const { tokens } = tokensRes;

      if (tokens.idToken) {
        oktaAuth.tokenManager.add("id_token", tokens.idToken);
      }
      if (tokens.accessToken) {
        oktaAuth.tokenManager.add("access_token", tokens.accessToken);
      }

      Router.push("/");
    })
    .catch(console.error);
}

export function getIdToken() {
  return oktaAuth.tokenManager.get("id_token");
}

export function getAccessToken() {
  return oktaAuth.tokenManager.get("access_token");
}

export const getAccessTokenFromAuthCode = async (req: any, res: any) => {
  try {
    const tokenRes = await axios.post(`${OKTA_DOMAIN_PERSONAL}/v1/token`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },

      params: {
        redirect_uri: OKTA_REDIRECT_URI_PERSONAL,
        code: req.query.code,
        code_verifier:
          "M25iVXpKU3puUjFaYWg3T1NDTDQtcW1ROUY5YXlwalNoc0hhakxifmZHag",
        grant_type: "authorization_code",
      },
    });
    console.log("TOKEN", tokenRes.data, tokenRes);
    window.localStorage.setItem("token", JSON.stringify(tokenRes.data));
    window.location.href = "http://localhost:3000";
  } catch (error) {
    console.log("Error fetching token", error);
  }
};
