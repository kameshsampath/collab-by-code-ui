import "../assets/js/keycloak.min";

export const kcConfig = {
  url: process.env.VUE_APP_KEYCLOAK_URL,
  realm: process.env.VUE_APP_KEYCLOAK_RELAM,
  clientId: process.env.VUE_APP_KEYCLOAK_CLIENT_ID
};

//console.log("KeyCloak Config:", JSON.stringify(kcConfig));

export const keyCloak = Keycloak(kcConfig);
