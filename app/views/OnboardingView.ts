import { el, Router, View } from "@common-module/app";
import { Button, ButtonType, ErrorDialog } from "@common-module/app-components";
import { WalletLoginManager } from "@common-module/wallet-login";
import { PersonaManager } from "gaiaprotocol";
import PersonaForm from "../form/PersonaForm.js";
import Layout from "./Layout.js";

export default class OnboardingView extends View {
  private form: PersonaForm | undefined;

  constructor() {
    super();

    const walletAddress = WalletLoginManager.getLoggedInAddress();
    if (walletAddress) {
      Layout.content = this.container = el(
        ".onboarding-view",
        el("header", el("h2", "Complete your persona")),
        el(
          "main",
          this.form = new PersonaForm({ wallet_address: walletAddress }),
        ),
        el(
          "footer",
          new Button({
            type: ButtonType.Contained,
            title: "Create persona",
            onClick: () => this.savePersona(),
          }),
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

  private async savePersona(): Promise<void> {
    if (!this.form) throw new Error("Form not found");

    const data = this.form.data;

    try {
      await PersonaManager.savePersona(data);
    } catch (error: any) {
      console.error(error);
      new ErrorDialog({
        title: "Error",
        message: `Failed to save persona:\n${error.message}`,
      });
      throw error;
    }

    data.created_at = new Date().toISOString();

    Router.go(`/${data.wallet_address}`, data);
  }
}
