import { Router, SPAInitializer } from "@common-module/app";
import AppConfig, { IAppConfig } from "./AppConfig.js";
import ChatWithHoldersView from "./views/ChatWithHoldersView.js";
import EditPersonaView from "./views/EditPersonaView.js";
import FeedView from "./views/FeedView.js";
import HomeView from "./views/HomeView.js";
import Layout from "./views/Layout.js";
import NotificationsView from "./views/NotificationsView.js";
import OnboardingView from "./views/OnboardingView.js";
import PersonaView from "./views/PersonaView.js";
import PostView from "./views/PostView.js";
import WritePostView from "./views/WritePostView.js";

export default async function init(config: IAppConfig) {
  AppConfig.init(config);
  SPAInitializer.init();

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
    .add([
      "/0x:walletAddress([a-fA-F0-9]{4,40})/post/:id",
      "/:name([^:.]+).:tld(eth|base.eth|gaia)/post/:id",
    ], PostView)
    .add("/edit-persona", EditPersonaView);
}
