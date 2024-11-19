import { DomNode, el, Router } from "@common-module/app";

export default class NavbarMenuItem extends DomNode<HTMLAnchorElement> {
  private iconContainer: DomNode;

  constructor(
    private icon: DomNode,
    private iconFilled: DomNode,
    label: string,
    public href: `/${string}`,
  ) {
    super("a.navbar-menu-item");
    this.append(
      this.iconContainer = el(".icon-container", icon),
      el(".label", label),
    );
    this.htmlElement.href = href;
    this.onDom("click", (event) => {
      event.preventDefault();
      Router.go(href);
    });
  }

  public active() {
    this.iconContainer.clear().append(this.iconFilled.clone());
    this.addClass("active");
  }

  public inactive() {
    this.iconContainer.clear().append(this.icon.clone());
    this.removeClass("active");
  }
}
