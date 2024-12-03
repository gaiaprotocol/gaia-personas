import { DomNode, el } from "@common-module/app";
import { Button, ButtonType } from "@common-module/app-components";
import { WalletLoginManager } from "@common-module/wallet-login";
import { GaiaProtocolConfig, PersonaEntity } from "gaiaprotocol";
import PersonaForm from "./PersonaForm.js";

export default class EditPersonaForm extends DomNode {
  private form: PersonaForm;

  constructor(
    oldPersona: PersonaEntity,
    private onSaved: (data: PersonaEntity) => void,
  ) {
    super(".edit-persona-form");

    const walletAddress = WalletLoginManager.getLoggedInAddress();
    if (!walletAddress) throw new Error("No wallet address found");

    this.append(
      el("header", el("h2", "Edit your persona")),
      el(
        "main",
        this.form = new PersonaForm(oldPersona),
      ),
      el(
        "footer",
        new Button({
          type: ButtonType.Contained,
          title: "Save persona",
          onClick: () => this.savePersona(),
        }),
      ),
      {
        onsubmit: (event) => {
          event.preventDefault();
        },
      },
    );
  }

  private async savePersona(): Promise<void> {
    const data = this.form.data;

    await GaiaProtocolConfig.supabaseConnector.callEdgeFunction(
      "save-persona",
      data,
    );

    data.created_at = new Date().toISOString();
    this.onSaved(data);
  }
}
