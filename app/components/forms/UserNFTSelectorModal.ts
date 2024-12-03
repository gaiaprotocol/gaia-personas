import { el } from "@common-module/app";
import { Button, StructuredModal } from "@common-module/app-components";
import { OpenSeaNFTData } from "gaiaprotocol";
import UserNFTSelector from "./UserNFTSelector.js";

export default class UserNFTSelectorModal extends StructuredModal {
  private nftSelector: UserNFTSelector;
  private useAsProfileButton: Button;

  constructor(onSelect: (nft: OpenSeaNFTData) => Promise<void> | void) {
    super(".user-nft-selector-modal");
    this
      .appendToHeader(el("h1", "Choose NFT for Profile"))
      .appendToMain(
        el("p", "Select an NFT to represent your Persona"),
        this.nftSelector = new UserNFTSelector("single"),
      )
      .appendToFooter(
        new Button(".cancel", {
          title: "Cancel",
          onClick: () => this.remove(),
        }),
        this.useAsProfileButton = new Button(".use-as-profile", {
          disabled: true,
          title: "Use as Profile",
          onClick: async () => {
            const nft = this.nftSelector.getSelectedNFT();
            if (nft) {
              await onSelect(nft);
              this.remove();
            }
          },
        }),
      );

    this.main.onDom("scroll", () => {
      if (
        this.main.htmlElement.scrollHeight - this.main.htmlElement.scrollTop >=
          this.main.htmlElement.clientHeight
      ) {
        this.nftSelector.loadMoreNFTs();
      }
    });

    this.nftSelector.on("changeSelectedNFT", (nft) => {
      nft
        ? this.useAsProfileButton.enable()
        : this.useAsProfileButton.disable();
    });
  }
}
