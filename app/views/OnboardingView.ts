import { el, View } from "@common-module/app";
import { CreatePersonaForm } from "gaiaprotocol";
import Layout from "./Layout.js";
import { WalletLoginManager } from "@common-module/wallet-login";

export default class OnboardingView extends View {
  constructor() {
    super();
    Layout.content = this.container = el(
      ".onboarding-view",
      WalletLoginManager.loggedInAddress
        ? new CreatePersonaForm(WalletLoginManager.loggedInAddress)
        : undefined,
    );
  }
}
