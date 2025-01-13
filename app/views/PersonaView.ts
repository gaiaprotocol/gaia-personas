import { el, Router, View } from "@common-module/app";
import { AppCompConfig } from "@common-module/app-components";
import { WalletLoginManager } from "@common-module/wallet-login";
import { PersonaDisplay, PersonaEntity, PersonaRepository } from "gaiaprotocol";
import Layout from "./Layout.js";

export default class PersonaView extends View {
  constructor() {
    super();
    Layout.content = this.container = el(".persona-view");
  }

  public async changeData(
    data:
      | { walletAddress?: string; name?: string; tld?: string }
      | PersonaEntity,
  ) {
    this.container.clear();

    const loadingSpinner = new AppCompConfig.LoadingSpinner().appendTo(
      this.container,
    );

    const persona = (data as PersonaEntity).created_at
      ? data as PersonaEntity
      : ("walletAddress" in data
        ? await PersonaRepository.fetchPersona(`0x${data.walletAddress}`)
        : await PersonaRepository.fetchPersonaByName(
          `${data.name}.${(data as any).tld}`,
        ));

    loadingSpinner.remove();

    if (!persona) this.container.append(el(".no-persona", "No persona found"));
    else {
      this.container.append(
        new PersonaDisplay({
          persona,
          showEditButton:
            persona.wallet_address === WalletLoginManager.getLoggedInAddress(),
          onEditClick: () => Router.go("/edit-persona", persona),
        }),
      );
    }
  }
}
