import { Router, SPAInitializer } from "@common-module/app";
import { AppCompConfig } from "@common-module/app-components";
import { MaterialLoadingSpinner } from "@common-module/material-loading-spinner";
import { SupabaseConnector } from "@common-module/supabase";
import { UniversalWalletConnector } from "@common-module/wallet";
import { WalletLoginManager } from "@common-module/wallet-login";
import App from "./App.js";
import AppConfig, { IAppConfig } from "./AppConfig.js";

export default async function init(config: IAppConfig) {
  AppConfig.init(config);
  AppCompConfig.LoadingSpinner = MaterialLoadingSpinner;
  SPAInitializer.init();

  SupabaseConnector.init(
    AppConfig.supabaseUrl,
    AppConfig.supabaseKey,
    WalletLoginManager,
  );

  UniversalWalletConnector.init({
    name: "Persona",
    icon: "https://persona.gaia.cc/images/icon-192x192.png",
    description:
      "Create your Persona with your own story, and build a community of supporters who believe in you.",
    walletConnectProjectId: "7538ca3cec20504b06a3338d0e53b028",
    chains: {
      "base-sepolia": {
        id: 84532,
        name: "Base Sepolia Testnet",
        symbol: "ETH",
        rpc: "https://sepolia.base.org",
        explorerUrl: "https://sepolia.basescan.org",
      },
    },
  });

  Router.add("/", App);
}
