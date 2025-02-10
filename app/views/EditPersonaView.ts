import { el, Router, View } from "@common-module/app";
import {
  AppCompConfig,
  Button,
  ButtonType,
  ErrorDialog,
} from "@common-module/app-components";
import { WalletLoginManager } from "@common-module/wallet-login";
import { PersonaEntity, PersonaManager, PersonaRepository } from "gaiaprotocol";
import PersonaForm from "../form/PersonaForm.js";
import Layout from "./Layout.js";

export default class EditPersonaView extends View {
  private form: PersonaForm | undefined;

  constructor() {
    super();
    Layout.content = this.container = el(".edit-persona-view");
  }

  public async changeData(data: {} | PersonaEntity) {
    const walletAddress = WalletLoginManager.getLoggedInAddress();
    if (!walletAddress) {
      Router.go("/");
      return;
    }

    const loadingSpinner = new AppCompConfig.LoadingSpinner().appendTo(
      this.container,
    );

    const persona = (data as PersonaEntity).created_at
      ? data as PersonaEntity
      : await PersonaRepository.fetchPersona(walletAddress);

    loadingSpinner.remove();

    if (!persona) this.container.append(el(".no-persona", "No persona found"));
    else {
      this.container.append(
        el("header", el("h2", "Edit your persona")),
        el(
          "main",
          this.form = new PersonaForm(persona),
        ),
        el(
          "footer",
          new Button({
            type: ButtonType.Contained,
            title: "Save persona",
            onClick: () => this.savePersona(),
          }),
        ),
      );
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

    data.updated_at = new Date().toISOString();

    Router.go(`/${data.wallet_address}`, data);
  }
}
