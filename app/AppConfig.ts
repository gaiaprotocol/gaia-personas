import { Router } from "@common-module/app";
import { WalletLoginConfig } from "@common-module/wallet-login";
import { base, baseSepolia } from "@wagmi/core/chains";
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

    GaiaProtocolConfig.initOnlyForGaiaProtocol(
      config.isDevMode,
      config.isTestnet,
    );

    WalletLoginConfig.init({
      chains: [base, baseSepolia] as any,
      supabaseConnector: GaiaProtocolConfig.supabaseConnector,
      walletConnectProjectId: "7538ca3cec20504b06a3338d0e53b028",
    });
  }
}

export default new AppConfig();
