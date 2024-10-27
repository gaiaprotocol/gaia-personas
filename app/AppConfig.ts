import { Router } from "@common-module/app";
import { GaiaProtocolConfig } from "gaiaprotocol";

export interface IAppConfig {
  isDevMode: boolean;
  isTestnet: boolean;
}

class AppConfig implements IAppConfig {
  public isDevMode!: boolean;
  public isTestnet!: boolean;

  public init(config: IAppConfig) {
    Object.assign(this, config);

    GaiaProtocolConfig.onLoggedInUserPersonaNotFound = () =>
      Router.go("/onboarding");
    GaiaProtocolConfig.init(config.isDevMode, config.isTestnet);
  }
}

export default new AppConfig();
