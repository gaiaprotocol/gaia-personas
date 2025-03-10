import { DomNode, Router } from "@common-module/app";
import { LoggedInUserAvatarButton } from "@common-module/social-components";
import { WalletLoginManager } from "@common-module/wallet-login";
import NavbarMenuItem from "./NavbarMenuItem.js";
import ChatIcon from "./navbar-icons/ChatIcon.js";
import ChatIconFilled from "./navbar-icons/ChatIconFilled.js";
import FeedIcon from "./navbar-icons/FeedIcon.js";
import FeedIconFilled from "./navbar-icons/FeedIconFilled.js";
import HomeIcon from "./navbar-icons/HomeIcon.js";
import HomeIconFilled from "./navbar-icons/HomeIconFilled.js";
import NotificationsIcon from "./navbar-icons/NotificationsIcon.js";
import NotificationsIconFilled from "./navbar-icons/NotificationsIconFilled.js";

export default class Navbar extends DomNode {
  constructor() {
    super(".navbar");
    this.append(
      new NavbarMenuItem(new HomeIcon(), new HomeIconFilled(), "Home", "/"),
      new NavbarMenuItem(
        new NotificationsIcon(),
        new NotificationsIconFilled(),
        "Notifications",
        "/notifications",
      ),
      new NavbarMenuItem(new FeedIcon(), new FeedIconFilled(), "Feed", "/feed"),
      new NavbarMenuItem(
        new ChatIcon(),
        new ChatIconFilled(),
        "Chat with holders",
        "/chat",
      ),
      new LoggedInUserAvatarButton(WalletLoginManager),
    );

    this.active(location.pathname);
    this.subscribe(Router, "routeChanged", (pathname) => this.active(pathname));
  }

  public active(href: string) {
    this.children.forEach((child) => {
      if (child instanceof NavbarMenuItem) {
        child.href === href ? child.active() : child.inactive();
      }
    });
  }
}
