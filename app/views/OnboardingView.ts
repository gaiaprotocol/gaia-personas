import { el, Router, View } from "@common-module/app";
import { WalletLoginManager } from "@common-module/wallet-login";
import { CreatePersonaForm } from "gaiaprotocol";
import Layout from "./Layout.js";

export default class OnboardingView extends View {
  constructor() {
    super();

    const walletAddress = WalletLoginManager.getLoggedInAddress();
    if (walletAddress) {
      Layout.content = this.container = el(
        ".onboarding-view",
        new CreatePersonaForm(
          walletAddress,
          (data) => Router.go(`/${walletAddress}`, data),
        ),
      );

      this.container.subscribe(
        WalletLoginManager,
        "loginStatusChanged",
        (loggedIn) => {
          if (!loggedIn) Router.goWithoutHistory("/");
        },
      );
    } else {
      Router.goWithoutHistory("/");
    }
  }
}
