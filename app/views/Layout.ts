import { BodyNode, DomNode, el, View } from "@common-module/app";
import { LoggedInUserAvatarButton } from "@common-module/social-components";
import { WalletLoginManager } from "@common-module/wallet-login";
import Navbar from "../navbar/Navbar.js";
import PersonaLogo from "../GaiaPersonasLogo.js";

export default class Layout extends View {
  private static current: Layout;

  public static set content(content: DomNode) {
    Layout.current.contentContainer.append(content);
  }

  private contentContainer: DomNode;

  constructor() {
    super();
    Layout.current = this;

    this.container = el(
      ".layout",
      el(
        "header",
        new PersonaLogo(),
        el(".button-container", new LoggedInUserAvatarButton(WalletLoginManager)),
      ),
      this.contentContainer = el("main"),
      new Navbar(),
    ).appendTo(BodyNode);
  }
}
