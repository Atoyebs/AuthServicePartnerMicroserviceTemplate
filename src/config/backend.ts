import SuperTokens from "supertokens-node";
import { TypeInput } from "supertokens-node/types";
import Jwt from "supertokens-node/recipe/jwt";

const connectionURI = `${process.env.NEXT_SERVER_SUPERTOKENS_CONNECTION_URI!}`;

export let backendConfig = (): TypeInput => {
  return {
    supertokens: {
      // this is the location of the SuperTokens core.
      connectionURI,
    },
    appInfo: {
      appName: "Template App Microservice",
      apiDomain: process.env.NEXT_SERVER_API_DOMAIN!,
      websiteDomain: process.env.NEXT_SERVER_WEBSITE_DOMAIN!,
    },
    recipeList: [Jwt.init()],
    framework: "custom",
  };
};

let initialized = false;
export function ensureSuperTokensInit() {
  if (!initialized) {
    SuperTokens.init(backendConfig());
    initialized = true;
  }
}
