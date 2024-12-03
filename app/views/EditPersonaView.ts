import { el, Router, View } from "@common-module/app";
import { AppCompConfig } from "@common-module/app-components";
import { WalletLoginManager } from "@common-module/wallet-login";
import { PersonaEntity, PersonaRepository } from "gaiaprotocol";
import EditPersonaForm from "../components/forms/EditPersonaForm.js";
import Layout from "./Layout.js";

export default class EditPersonaView extends View {
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
        new EditPersonaForm(
          persona,
          (data) => Router.go(`/${walletAddress}`, data),
        ),
      );
    }
  }
}
