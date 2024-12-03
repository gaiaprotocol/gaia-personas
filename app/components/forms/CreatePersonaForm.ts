import { DomNode, el } from "@common-module/app";
import { Button, ButtonType } from "@common-module/app-components";
import { GaiaProtocolConfig, PersonaEntity } from "gaiaprotocol";
import PersonaForm from "./PersonaForm.js";

export default class CreatePersonaForm extends DomNode {
  private form: PersonaForm;

  constructor(
    walletAddress: string,
    private onSaved: (data: PersonaEntity) => void,
  ) {
    super(".create-persona-form");

    this.append(
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
