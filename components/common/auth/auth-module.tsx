import React, { SyntheticEvent, useEffect } from "react";
import config from "./config";
const OktaAuth = require("@okta/okta-auth-js").OktaAuth;

const AuthModule = (props: any) => {
  let authClient: any;

  const showError = (error: any) => {
    console.log("ERRRRRR", error);
  };

  function getUserInfo() {
    return authClient.token
      .getUserInfo()
      .then(function (value: any) {
        // updateAppState({ userInfo: value });
        // renderApp();
        console.log("userrrr", value);
      })
      .catch(function (error: any) {
        // This is expected when Okta SSO does not exist
        showError(error);
      });
  }

  const createAuthClient = () => {
    // The `OktaAuth` constructor can throw if the config is malformed

    try {
      authClient = new OktaAuth({
        issuer: config.issuer,
        clientId: config.clientId,
        redirectUri: config.redirectUri,
        scopes: config.scopes,
        pkce: true,
        //useInteractionCodeFlow: true,
        tokenManager: {
          storage: config.storage,
        },
        transformAuthState: async (oktaAuth: any, authState: any) => {
          if (!authState.isAuthenticated) {
            return authState;
          }
          // extra requirement: user must have valid Okta SSO session
          const user = await oktaAuth.token.getUserInfo();
          console.log("USER", user);
          authState.isAuthenticated = !!user; // convert to boolean
          authState.users = user; // also store user object on authState
          return authState;
        },
      });
      if (config.startService) {
        authClient.start();
      }
    } catch (error) {
      console.log("Create Okta Client Error: ", error);
      //return showError(error);
    }
  };

  function handleTransaction(transaction: any) {
    if (!config.useInteractionCodeFlow) {
      // Authn
      //return handleTransactionAuthn(transaction);
    }

    // IDX
    if (transaction.messages) {
      showError(transaction.messages);
    }

    switch (transaction.status) {
      case "PENDING":
        if (transaction.nextStep.name === "identify") {
          //renderDynamicSigninForm(transaction);
          break;
        }
        // hideSigninForm();
        // updateAppState({ transaction });
        // showMfa();
        break;
      case "FAILURE":
        showError(transaction.error);
        break;
      case "SUCCESS":
        // hideSigninForm();
        // endAuthFlow(transaction.tokens);
        //getUserInfo();
        break;
      default:
        throw new Error(transaction.status + " status");
    }
  }

  const signOut = () => {
    authClient.signOut({ clearTokensBeforeRedirect: true });
  };

  const onFormSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const email = (event.target as any).email.value;
    const password = (event.target as any).password.value;
    console.log(email, password);

    // if (!config.useInteractionCodeFlow) {
    //   // Authn
    //   return authClient
    //     .signIn({ email, password })
    //     .then(handleTransaction)
    //     .catch(showError);
    // }

    return authClient.idx
      .authenticate({ email, password })
      .then(handleTransaction)
      .catch(showError);
  };

  useEffect(() => {
    createAuthClient();
  }, []);

  return (
    <div>
      AuthModule
      <form onSubmit={onFormSubmit}>
        <input name="email" placeholder="Email"></input>
        <input name="password" placeholder="Password"></input>
        <button type="submit">Login</button>
      </form>
      <button
        onClick={(e: any) => {
          e.preventDefault();
          signOut();
        }}
      >
        Sign out
      </button>
      <button
        onClick={(e: any) => {
          e.preventDefault();
          authClient.signInWithRedirect();
        }}
      >
        Sign In With Redirect
      </button>
    </div>
  );
};

export default AuthModule;
