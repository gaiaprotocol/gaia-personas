import { AppCompConfig, Input } from "@common-module/app-components";
import { WalletLoginManager } from "@common-module/wallet-login";
import { GaiaNameRepository } from "gaiaprotocol";
import NameSelectorModal from "./NameSelectorModal.js";

export default class GaiaNameSelectorModal extends NameSelectorModal {
  constructor(onSelect: (name: string) => Promise<void> | void) {
    super("Gaia Name", onSelect);
    this.loadName();
  }

  public async loadName(): Promise<void> {
    const loggedInAddress = WalletLoginManager.getLoggedInAddress();
    if (!loggedInAddress) throw new Error("Not logged in");

    this.nameDisplay.clear().append(new AppCompConfig.LoadingSpinner());

    const data = await GaiaNameRepository.fetchByWallet(loggedInAddress);
    if (!data) {
      this.nameDisplay.clear().append("You do not have an Gaia name");
    } else {
      this.selectedName = `${data.name}.gaia`;
      this.useThisNameButton.enable();

      this.nameDisplay.clear().append(
        new Input({
          value: `${data.name}.gaia`,
          readOnly: true,
        }),
      );
    }
  }
}
