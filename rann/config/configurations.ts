export default () => {
  return {
    keycloakAuthUrl: process.env.KEYCLOAK_AUTH_URL,
    keycloakRealm: process.env.KEYCLOAK_REALM,
    apiKeySwaggerGamma: process.env.URL_SWAGGER_GAMMA,
    urlSwaggerGamma: process.env.API_KEY_SWAGGER_GAMMA,
    numberEmployeesToStartCourse: 30,
  };
};
