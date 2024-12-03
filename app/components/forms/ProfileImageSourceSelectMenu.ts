import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@common-module/app-components";
import { DeleteIcon, ImageIcon, NFTIcon } from "@gaiaprotocol/svg-icons";

interface ProfileImageSourceSelectMenuOptions {
  imageExists: boolean;
  onSelect: (source: "upload" | "nft") => void;
  onDeleted: () => void;
}

export default class ProfileImageSourceSelectMenu extends DropdownMenu {
  constructor(
    left: number,
    top: number,
    options: ProfileImageSourceSelectMenuOptions,
  ) {
    super(".profile-image-source-select", { left, top });
    this.appendToMain(
      new DropdownMenuGroup(
        new DropdownMenuItem({
          icon: new ImageIcon(),
          label: "Upload image",
          onClick: () => {
            options.onSelect("upload");
            this.remove();
          },
        }),
        new DropdownMenuItem({
          icon: new NFTIcon(),
          label: "Select from NFTs",
          onClick: () => {
            options.onSelect("nft");
            this.remove();
          },
        }),
      ),
      options.imageExists
        ? new DropdownMenuGroup(
          new DropdownMenuItem({
            icon: new DeleteIcon(),
            label: "Delete image",
            onClick: () => {
              options.onDeleted();
              this.remove();
            },
          }),
        )
        : undefined,
    );
  }
}
