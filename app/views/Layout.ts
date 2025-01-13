import { BodyNode, DomNode, el, Router, View } from "@common-module/app";
import { Button, ButtonType } from "@common-module/app-components";
import { LoggedInUserAvatarButton } from "@common-module/social-components";
import { WalletLoginManager } from "@common-module/wallet-login";
import { AddIcon } from "@gaiaprotocol/svg-icons";
import PersonaLogo from "../GaiaPersonasLogo.js";
import Navbar from "../navbar/Navbar.js";

export default class Layout extends View {
  private static _current: Layout;

  public static set content(content: DomNode) {
    Layout._current.contentContainer.append(content);
  }

  private buttonContainer: DomNode;
  private postButton?: Button;
  private contentContainer: DomNode;

  constructor() {
    super();
    Layout._current = this;

    this.container = el(
      ".layout",
      el(
        "header",
        new PersonaLogo(),
        this.buttonContainer = el(
          ".button-container",
          new LoggedInUserAvatarButton(WalletLoginManager),
        ),
      ),
      this.contentContainer = el("main"),
      new Navbar(),
    ).appendTo(BodyNode);

    this.renderPostButton();
    this.container.subscribe(
      WalletLoginManager,
      "loginStatusChanged",
      () => this.renderPostButton(),
    );
  }

  private renderPostButton() {
    this.postButton?.remove();

    if (WalletLoginManager.isLoggedIn()) {
      this.postButton = new Button({
        type: ButtonType.Circle,
        icon: new AddIcon(),
        onClick: () => Router.go("/write"),
      }).appendTo(this.buttonContainer, 0);
    }
  }
}
