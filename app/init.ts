import { Router, SPAInitializer } from "@common-module/app";
import { AppCompConfig } from "@common-module/app-components";
import { MaterialLoadingSpinner } from "@common-module/material-loading-spinner";
import { UniversalWalletConnector } from "@common-module/wallet";
import AppConfig, { IAppConfig } from "./AppConfig.js";
import ChatWithHoldersView from "./views/ChatWithHoldersView.js";
import FeedView from "./views/FeedView.js";
import HomeView from "./views/HomeView.js";
import Layout from "./views/Layout.js";
import NotificationsView from "./views/NotificationsView.js";
import PersonaView from "./views/PersonaView.js";
import OnboardingView from "./views/OnboardingView.js";

export default async function init(config: IAppConfig) {
  AppConfig.init(config);
  AppCompConfig.LoadingSpinner = MaterialLoadingSpinner;
  SPAInitializer.init();

  UniversalWalletConnector.init({
    name: "Gaia Personas",
    icon: "https://personas.gaia.cc/images/icon-192x192.png",
    description: "Web3 persona service by Gaia Protocol",
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

  Router
    .add("/*", Layout)
    .add("/onboarding", OnboardingView)
    .add("/", HomeView)
    .add("/notifications", NotificationsView)
    .add("/feed", FeedView)
    .add("/chat", ChatWithHoldersView)
    .add([
      "/0x:walletAddress([a-fA-F0-9]{4,40})",
      "/:name([^:.]+).:tld(eth|base.eth|gaia)",
    ], PersonaView);
}
