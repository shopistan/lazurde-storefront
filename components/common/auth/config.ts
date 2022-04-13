export default {
  issuer: `https://fabric-lazurde-storefront-sbx.okta.com/oauth2/default`, //For example, `"https://example.okta.com/oauth2/default"`
  clientId: `0oar950myOXfqJTVC696`, // for example, `0oa2am3kk1CraJ8xO1d7`,
  redirectUri: "http://localhost:8080/login/callback",
  scopes: ["openid", "email"],
  storage: "sessionStorage",
  useInteractionCodeFlow: true,
  requireUserSession: "true",
  authMethod: "form",
  startService: false,
  useDynamicForm: false,
  uniq: Date.now() + Math.round(Math.random() * 1000), // to guarantee a unique state
  idps: "",
};
