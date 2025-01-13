import { Router, SPAInitializer } from "@common-module/app";
import { WalletLoginManager } from "@common-module/wallet-login";
import AppConfig, { IAppConfig } from "./AppConfig.js";
import ChatWithHoldersView from "./views/ChatWithHoldersView.js";
import EditPersonaView from "./views/EditPersonaView.js";
import FeedView from "./views/FeedView.js";
import HomeView from "./views/HomeView.js";
import Layout from "./views/Layout.js";
import NotificationsView from "./views/NotificationsView.js";
import OnboardingView from "./views/OnboardingView.js";
import PersonaView from "./views/PersonaView.js";
import WritePostView from "./views/WritePostView.js";

export default async function init(config: IAppConfig) {
  AppConfig.init(config);
  SPAInitializer.init();
  WalletLoginManager.init();

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
    ], PersonaView)
    .add("/write", WritePostView)
    .add("/edit-persona", EditPersonaView);
}
