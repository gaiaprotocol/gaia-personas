import { AppCompConfig, Input } from "@common-module/app-components";
import { GaiaProtocolConfig } from "gaiaprotocol";
import NameSelectorModal from "./NameSelectorModal.js";

export default class BasenameSelectorModal extends NameSelectorModal {
  constructor(onSelect: (name: string) => Promise<void> | void) {
    super("Basename", onSelect);
    this.loadName();
  }

  public async loadName(): Promise<void> {
    this.nameDisplay.clear().append(new AppCompConfig.LoadingSpinner());

    const name = await GaiaProtocolConfig.supabaseConnector.callEdgeFunction<
      string
    >("get-user-basename");

    if (name === "") {
      this.nameDisplay.clear().append("You do not have an Basename");
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
