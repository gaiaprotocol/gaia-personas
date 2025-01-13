import { DomNode, el } from "@common-module/app";
import { Button, ButtonType, Input } from "@common-module/app-components";
import { PersonaEntity } from "gaiaprotocol";
import BasenameSelectorModal from "./name-selector/BasenameSelectorModal.js";
import ENSNameSelectorModal from "./name-selector/ENSNameSelectorModal.js";
import GaiaNameSelectorModal from "./name-selector/GaiaNameSelectorModal.js";
import PersonaAvatarInput from "./PersonaAvatarInput.js";

export default class PersonaForm extends DomNode<HTMLDivElement, {
  dataChanged: (data: PersonaEntity) => void;
}> {
  private avatarInput: PersonaAvatarInput;
  private nameInput: Input;
  private ensNameButton: Button;
  private basenameButton: Button;
  private gaiaNameButton: Button;

  constructor(public data: PersonaEntity) {
    super(".persona-form");

    this.append(
      this.avatarInput = new PersonaAvatarInput(data.wallet_address, {
        profileImageUrl: data.profile_image_url,
        profileThumbnailUrl: data.profile_thumbnail_url,
        nftAddress: data.profile_nft_address,
        nftTokenId: data.profile_nft_token_id,
      }),
      el(
        ".wallet-address-input-container",
        new Input({
          label: "Wallet address",
          value: data.wallet_address,
          readOnly: true,
        }),
      ),
      el(
        ".display-name-input-container",
        this.nameInput = new Input({
          label: "Display name",
          placeholder: "Enter display name",
          value: this.data.name,
          onChange: (newValue) => {
            console.log(newValue);
            this.data.name = newValue;
            this.updateNameSource(null);
            this.emit("dataChanged", this.data);
          },
          onClick: (input) => {
            if (input.readOnly) this.clearName();
          },
        }),
        el(
          ".select-name-buttons",
          this.ensNameButton = new Button(
            `.ens-name${this.data.is_ens_name ? ".selected" : ""}`,
            {
              type: ButtonType.Outlined,
              title: "Use ENS Name",
              onClick: () => {
                if (!this.data.is_ens_name) {
                  new ENSNameSelectorModal((name) =>
                    this.selectName(name, "ENS")
                  );
                }
              },
            },
          ),
          this.basenameButton = new Button(
            `.basename${this.data.is_basename ? ".selected" : ""}`,
            {
              type: ButtonType.Outlined,
              title: "Use Basename",
              onClick: () => {
                if (!this.data.is_basename) {
                  new BasenameSelectorModal((name) =>
                    this.selectName(name, "Basename")
                  );
                }
              },
            },
          ),
          this.gaiaNameButton = new Button(
            `.gaia-name${this.data.is_gaia_name ? ".selected" : ""}`,
            {
              type: ButtonType.Outlined,
              title: "Use Gaia Name",
              onClick: () => {
                if (!this.data.is_gaia_name) {
                  new GaiaNameSelectorModal((name) =>
                    this.selectName(name, "Gaia")
                  );
                }
              },
            },
          ),
        ),
      ),
      el(
        ".bio-input-container",
        new Input({
          label: "Bio",
          placeholder: "Something about yourself",
          multiline: true,
          value: this.data.bio,
          onChange: (newValue) => {
            this.data.bio = newValue;
            this.emit("dataChanged", this.data);
          },
        }),
      ),
    );

    this.avatarInput.on("dataChanged", (data) => {
      this.data.profile_image_url = data.profileImageUrl;
      this.data.profile_thumbnail_url = data.profileThumbnailUrl;
      this.data.profile_nft_address = data.nftAddress;
      this.data.profile_nft_token_id = data.nftTokenId;
      this.emit("dataChanged", this.data);
    });
  }

  private clearName() {
    this.data.name = undefined;
    this.updateNameSource(null);
    this.emit("dataChanged", this.data);

    this.nameInput.readOnly = false;
    this.nameInput.value = "";

    this.updateButtonSelection();
  }

  private selectName(name: string, source: "ENS" | "Basename" | "Gaia") {
    this.data.name = name;
    this.updateNameSource(source);
    this.emit("dataChanged", this.data);

    this.nameInput.readOnly = true;
    this.nameInput.value = name;

    this.updateButtonSelection();
  }

  private updateNameSource(source: "ENS" | "Basename" | "Gaia" | null) {
    this.data.is_ens_name = source === "ENS" ? true : undefined;
    this.data.is_basename = source === "Basename" ? true : undefined;
    this.data.is_gaia_name = source === "Gaia" ? true : undefined;
  }

  private updateButtonSelection() {
    this.data.is_ens_name
      ? this.ensNameButton.addClass("selected")
      : this.ensNameButton.removeClass("selected");

    this.data.is_basename
      ? this.basenameButton.addClass("selected")
      : this.basenameButton.removeClass("selected");

    this.data.is_gaia_name
      ? this.gaiaNameButton.addClass("selected")
      : this.gaiaNameButton.removeClass("selected");
  }
}
