import { AppCompConfig, Input } from "@common-module/app-components";
import { GaiaProtocolConfig } from "gaiaprotocol";
import NameSelectorModal from "./NameSelectorModal.js";

export default class ENSNameSelectorModal extends NameSelectorModal {
  constructor(onSelect: (name: string) => Promise<void> | void) {
    super("ENS Name", onSelect);
    this.loadName();
  }

  public async loadName(): Promise<void> {
    this.nameDisplay.clear().append(new AppCompConfig.LoadingSpinner());

    const name = await GaiaProtocolConfig.supabaseConnector.callEdgeFunction<
      string
    >("get-user-ens-name");

    if (name === "") {
      this.nameDisplay.clear().append("You do not have an ENS name");
    } else {
      this.selectedName = name;
      this.useThisNameButton.enable();

      this.nameDisplay.clear().append(
        new Input({
          value: name,
          readOnly: true,
        }),
      );
    }
  }
}
